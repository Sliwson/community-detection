#include "cuda.cuh"

namespace {

	constexpr int countersSize = 32;

	__global__ void PerformLpaStep(int* communities, int* communitiesBuf, int* vertices, int* edges, int verticesCount)
	{
		int idx = blockDim.x * blockIdx.x + threadIdx.x;

		int countersIdx[countersSize];
		int counters[countersSize];
		int counterCount = 0;

		if (idx < verticesCount)
		{
			int edgesBegin = 0;
			if (idx > 0)
				edgesBegin = vertices[idx - 1];

			int edgesEnd = vertices[idx];

			for (int i = edgesBegin; i < edgesEnd; i++)
			{
				int neigh = edges[i];
				bool found = false;

				for (int y = 0; y < counterCount; y++)
				{
					if (countersIdx[y] == neigh)
					{
						found = true;
						counters[y] += 1;
						break;
					}
				}

				if (!found && counterCount < countersSize)
				{
					countersIdx[counterCount] = neigh;
					counters[counterCount] = 1;
					counterCount++;
				}
			}

			if (counterCount > 0)
			{
				int max = 0;
				for (int y = 1; y < counterCount; y++)
					if (counters[y] > counters[max])
						max = y;

				communitiesBuf[idx] = countersIdx[max];
			}
		}
	}
}

void CudaLPA::CreateGpuGraph()
{
	printf("Creating gpu graph (naive), begin...\n");
	const auto verticesCount = inputVertices.size();
	const auto edgesCount = inputEdges.size();

	// create cpu arrays
	thrust::host_vector<int> vertices(verticesCount);
	thrust::host_vector<int> edges(edgesCount * 2);

	int currentEdge = 0;
	for (int vertex = 0; vertex < verticesCount; vertex++)
	{
		for (const auto& edge : inputEdges)
		{
			if (edge.first == vertex)
			{
				edges[currentEdge] = edge.second;
				currentEdge++;
			}
			else if (edge.second == vertex)
			{
				edges[currentEdge] = edge.first;
				currentEdge++;
			}
		}

		vertices[vertex] = currentEdge;
	}

	if (vertices[verticesCount - 1] != edgesCount * 2)
		printf("Error, filled less data than expected\n");

	// copy arrays to gpu
	d_vertices = vertices;
	d_edges = edges;

	d_communities = thrust::device_vector<int>(verticesCount);
	d_communities_buf = thrust::device_vector<int>(verticesCount);

	thrust::sequence(thrust::device, d_communities.begin(), d_communities.end());

	printf("Creating gpu graph (naive), end...\n");
}

thrust::host_vector<int> CudaLPA::Calculate()
{
	printf("Kernel execution, begin...\n");

	const auto verticesCount = inputVertices.size();
	constexpr int iterations = 10;

	constexpr int threadsPerBlock = 256;
	const int blocksPerGrid = (verticesCount + threadsPerBlock - 1) / threadsPerBlock;

	auto cptr = thrust::raw_pointer_cast(d_communities.data());
	auto cptrBuf = thrust::raw_pointer_cast(d_communities_buf.data());
	auto vptr = thrust::raw_pointer_cast(d_vertices.data());
	auto eptr = thrust::raw_pointer_cast(d_edges.data());

	for (int i = 0; i < iterations; i++)
	{
		if (i % 2 == 0)
		{
			PerformLpaStep << <blocksPerGrid, threadsPerBlock >> > (cptr, cptrBuf, vptr, eptr, verticesCount);
		}
		else
		{
			PerformLpaStep << <blocksPerGrid, threadsPerBlock >> > (cptrBuf, cptr, vptr, eptr, verticesCount);
		}

		cudaDeviceSynchronize();
	}

	auto result = thrust::host_vector<int>(inputVertices.size());
	if (iterations % 2 == 0)
		thrust::copy(d_communities.begin(), d_communities.end(), result.begin());
	else
		thrust::copy(d_communities_buf.begin(), d_communities_buf.end(), result.begin());

	printf("Kernel execution, end...\n");
	return result;
}
