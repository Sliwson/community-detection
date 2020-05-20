#include "loader.h"
#include <fstream>
#include <sstream>
#include <stdio.h>
#include <charconv>
#include <filesystem>

using namespace std;

namespace {
	vector<string> Split(const string& text, char delim)
	{
        std::vector<string> tokens;
        auto out = std::back_inserter(tokens);

		std::istringstream ss{ text };
		string token;
		while (ss.good())
		{
			getline(ss, token, delim);
			*(out++) = token;
		}
        
        return tokens;
	}

	auto ToInt(const string& str) 
	{
		int v = 0;
		from_chars(str.c_str(), str.c_str() + str.size(), v);
		return v;
	};
}

bool GraphLoader::Load()
{
	if (!filesystem::exists(verticesPath))
	{
		printf("Vertices path incorrect (%s)!\n", verticesPath.c_str());
		return false;
	}
	
	if (!filesystem::exists(edgesPath))
	{
		printf("Edges path incorrect (%s)!\n", edgesPath.c_str());
		return false;
	}

    vertices.clear();
    edges.clear();

	fstream stream;
	stream.open(verticesPath, ios::in);
    string line;

    //get header
	stream.ignore(3);
    getline(stream, line);
    printf("Reading %s with header \"%s\"\n", verticesPath.c_str(), line.c_str());

    //read vertices
    while (getline(stream, line)) 
    {
        auto tokens = Split(line, ';');
        if (tokens.size() <= 0)
        {
            printf("Error, line contains 0 elements\n");
            continue;
        }

		vertices.push_back(ToInt(tokens[0]));
    }

	stream.close();
	printf("Loaded %zd vertices\n", vertices.size());
	stream.open(edgesPath, ios::in);

	//get header
	stream.ignore(3);
	getline(stream, line);
	printf("Reading %s with header \"%s\"\n", edgesPath.c_str(), line.c_str());

    //read vertices
    while (getline(stream, line)) 
    {
        auto tokens = Split(line, ';');
        if (tokens.size() <= 1)
        {
            printf("Error, line contains too few elements\n");
            continue;
        }

		const auto v1 = ToInt(tokens[0]);
		const auto v2 = ToInt(tokens[1]);
		edges.push_back(make_pair(v1, v2));
    }

	stream.close();
	printf("Loaded %zd edges\n", edges.size());
	return true;
}
