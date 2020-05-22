#include "exporter.h"
#include <fstream>

using namespace std;

void GraphExporter::ExportCommunityLabels(const thrust::host_vector<int>& labels, std::string outputPath)
{
	fstream out;
	string line;

	out.open(outputPath, ios::out | ios::trunc);

	for (const auto& l : labels)
	{
		line = std::to_string(l) + "\n";
		out.write(line.c_str(), line.length());
	}

	out.close();
	printf("Exported %d community labels", labels.size());
}
