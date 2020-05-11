import requests
import json
import csv

response = requests.get('https://api.github.com/users/wwylele/repos', auth=('8902bc979763f1342c7efe61f50cf05816ecf54d', 'x-oauth-basic'))
responseJson = response.json()

nodes = []
edges = []
queue = []
queue.append(responseJson)

for item in queue:
    for repo in item:
#        print(repo['contributors_url'])
        response2 = requests.get(repo['contributors_url'], auth=('8902bc979763f1342c7efe61f50cf05816ecf54d', 'x-oauth-basic'))
        response2Json = response2.json()
        if len(response2Json) > 1:
            for contributor in response2Json:                
                rsp = requests.get(contributor['repos_url'], auth=('8902bc979763f1342c7efe61f50cf05816ecf54d', 'x-oauth-basic'))
                rspJson = rsp.json()
                #add to node array if not exists now
                if len(list(filter(lambda node: node['id'] == contributor['id'], nodes))) == 0:
                    nodes.append(
                        {
                            'id': contributor['id'],
                            'name': contributor['login']                            
                        }
                    )
 #                   print(contributor['login'] + " added")
                #add to queue if not exists already
                if not queue.__contains__(rspJson):
#                    print("new item added")
                    queue.append(rspJson)
                #add edges
                for otherContributor in response2Json:
                    if contributor['id'] != otherContributor['id']:
                        edges.append(
                            {
                                'repo_id': repo['id'],
                                'created_date': repo['created_at'],
                                'updated_date': repo['updated_at'],
                                'pushed_date': repo['pushed_at'],
                                'contributions': contributor['contributions'] + otherContributor['contributions'],
                                'contributor_1_id': min(contributor['id'], otherContributor['id']),
                                'contributor_2_id': max(contributor['id'], otherContributor['id'])
                            }
                        )
        #with open('nodes.json','w') as outfile:
        #    json.dump(nodes,outfile)
        f1 = csv.writer(open("nodes.csv", "w+"))
        f1.writerow(["id", "name"])
        for node in nodes:
            f1.writerow([node["id"], node["name"]])

#       with open('edges.json','w') as outfile:
#            json.dump(edges,outfile)
        f2 = csv.writer(open("edges.csv", "w+"))
        f2.writerow(["repo_id", "created_date", "updated_date", "pushed_date", "contributions",
                    "contributor_1_id", "contributor_2_id"])
        for edge in edges:
            f2.writerow([edge["repo_id"],
                        edge["created_date"],
                        edge["updated_date"],
                        edge["pushed_date"], 
                        edge["contributions"],
                        edge["contributor_1_id"],
                        edge["contributor_2_id"]])

        print("data saved")

with open('data.json','w') as outfile:
    json.dump(response2.json(),outfile)


