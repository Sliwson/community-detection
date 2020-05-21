#include "cuda.cuh"
#include "functors.cuh"

namespace {

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

	printf("Creating gpu graph (naive), end...\n");
}

thrust::host_vector<int> CudaLPA::Calculate()
{
	printf("Kernel execution, begin...\n");
	auto result = thrust::host_vector<int>(inputVertices.size());
	thrust::sequence(thrust::host, result.begin(), result.end(), 0);
	printf("Kernel execution, end...\n");
	return result;
}
