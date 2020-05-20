#include "cuda.cuh"

namespace {
	constexpr char* vertices = "../../Data/Basketball/Players.csv";
	constexpr char* edges = "../../Data/Basketball/Edges.csv";
}

int main()
{
	auto loader = GraphLoader(vertices, edges, GraphType::Basketball);
	loader.Load();
	auto vertices = loader.GetVertices();
	auto edges = loader.GetEdges();

	return 0;
}
