#pragma once

#include <thrust/execution_policy.h>
#include <thrust/sequence.h>

#include "includes.h"

class CudaLPA
{
public:
	CudaLPA(thrust::host_vector<int> vertices, thrust::host_vector<thrust::pair<int, int>> edges) : inputVertices(vertices), inputEdges(edges) {}

	void CreateGpuGraph();
	thrust::host_vector<int> Calculate();

	CudaLPA(const CudaLPA&) = delete;
	CudaLPA(const CudaLPA&&) = delete;
	CudaLPA& operator=(const CudaLPA&) = delete;

private:

	thrust::host_vector<int> inputVertices;
	thrust::host_vector<thrust::pair<int, int>> inputEdges;
};


