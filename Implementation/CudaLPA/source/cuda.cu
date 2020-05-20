#include "cuda.cuh"
#include "functors.cuh"

namespace {

}

thrust::host_vector<int> CalculateLPA(thrust::host_vector<int> vertices, thrust::host_vector<thrust::pair<int, int>> edges)
{
	printf("Kernel execution, begin...\n");
	auto result = thrust::host_vector<int>(vertices.size());
	thrust::sequence(thrust::host, result.begin(), result.end(), 0);
	printf("Kernel execution, end...\n");
	return result;
}
