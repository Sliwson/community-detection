#include "cuda.cuh"
#include "functors.cuh"

namespace {

}

void CudaLPA::CreateGpuGraph()
{
}

thrust::host_vector<int> CudaLPA::Calculate()
{
	printf("Kernel execution, begin...\n");
	auto result = thrust::host_vector<int>(inputVertices.size());
	thrust::sequence(thrust::host, result.begin(), result.end(), 0);
	printf("Kernel execution, end...\n");
	return result;
}
