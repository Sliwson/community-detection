#pragma once

#include <thrust/execution_policy.h>
#include <thrust/sequence.h>

#include "includes.h"
#include "timer.h"
#include "loader.h"

thrust::host_vector<int> CalculateLPA(thrust::host_vector<int> vertices, thrust::host_vector<thrust::pair<int, int>> edges);


