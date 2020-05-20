#pragma once

#include "includes.h"

enum class GraphType
{
	Basketball,
	Github,
	Filmweb
};

class GraphLoader
{
public:
	GraphLoader(std::string verticesPath, std::string edgesPath, GraphType type) :
		verticesPath(verticesPath), edgesPath(edgesPath), type(type) {}

	GraphLoader(const GraphLoader&) = delete;
	GraphLoader(const GraphLoader&&) = delete;
	GraphLoader& operator=(const GraphLoader&) = delete;

	bool Load();

	auto GetVertices() const { return vertices; }
	auto GetEdges() const { return edges; }

private:
	std::string verticesPath;
	std::string edgesPath;
	GraphType type;

	thrust::host_vector<int> vertices;
	thrust::host_vector<thrust::pair<int, int>> edges;
};
