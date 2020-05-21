#pragma once

#include <thrust/execution_policy.h>
#include <thrust/sequence.h>
#include <thrust/device_vector.h>

#include "includes.h"
#include "timer.h"

class CudaLPA
{
public:
	CudaLPA(const thrust::host_vector<int>& vertices, const thrust::host_vector<thrust::pair<int, int>>& edges) : inputVertices(vertices), inputEdges(edges) {}

	void CreateGpuGraph(Timer* timer);
	thrust::host_vector<int> Calculate();

	CudaLPA(const CudaLPA&) = delete;
	CudaLPA(const CudaLPA&&) = delete;
	CudaLPA& operator=(const CudaLPA&) = delete;

private:
	thrust::device_vector<int> d_vertices;
	thrust::device_vector<int> d_edges;
	thrust::device_vector<int> d_communities;
	thrust::device_vector<int> d_communities_buf;

	thrust::host_vector<int> inputVertices;
	thrust::host_vector<thrust::pair<int, int>> inputEdges;
};
