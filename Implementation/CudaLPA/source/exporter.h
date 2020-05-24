#pragma once

#include "includes.h"

class GraphExporter
{ 
public:
	static void ExportCommunityLabels(const thrust::host_vector<int>& labels, std::string outputPath);
};
