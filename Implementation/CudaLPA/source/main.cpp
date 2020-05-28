#include "cuda.cuh"

#include "timer.h"
#include "loader.h"
#include "exporter.h"

namespace {
	constexpr char* verticesPath = "../../Data/Filmweb/allActors.csv";
	constexpr char* edgesPath = "../../Data/Facebook/fb.mtx";
	constexpr char* output = "../../Data/CudaLPA/Facebook.csv";
}

int main()
{
	auto timer = Timer("Cuda lpa timer");

	timer.StartStage("loading data");

	auto loader = GraphLoader(verticesPath, edgesPath, GraphType::Facebook);
	loader.Load();
	auto vertices = loader.GetVertices();
	auto edges = loader.GetEdges();

	timer.StopStage("loading data");

	auto cuda = CudaLPA(vertices, edges);
	//timer calls inside
	cuda.CreateGpuGraph(&timer);

	timer.StartStage("calculation");

	auto result = cuda.Calculate();

	timer.StopStage("calculation");
	timer.StartStage("export");

	GraphExporter::ExportCommunityLabels(result, output);

	timer.StopStage("export");
	printf("\n\n");
	timer.PrintResults();

	return 0;
}
