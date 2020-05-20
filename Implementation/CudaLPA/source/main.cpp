#include "cuda.cuh"

namespace {
	constexpr char* verticesPath = "../../Data/Basketball/Players.csv";
	constexpr char* edgesPath = "../../Data/Basketball/Edges.csv";
}

int main()
{
	auto timer = Timer("Cuda lpa timer");

	timer.StartStage("loading data");

	auto loader = GraphLoader(verticesPath, edgesPath, GraphType::Basketball);
	loader.Load();
	auto vertices = loader.GetVertices();
	auto edges = loader.GetEdges();

	timer.StopStage("loading data");
	timer.StartStage("calculation");

	auto result = CalculateLPA(vertices, edges);

	timer.StopStage("calculation");
	timer.StartStage("export");


	timer.StopStage("export");
	printf("\n");
	timer.PrintResults();

	return 0;
}
