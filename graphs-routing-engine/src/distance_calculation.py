import json
import os
from math import radians, sin, cos, sqrt, atan2
from node import Nodes

EARTH_RADIUS = 6371000

def haversine(lat1, lon1, lat2, lon2):
    lat1, lon1 = radians(lat1), radians(lon1)
    lat2, lon2 = radians(lat2), radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (sin(dlat / 2) ** 2 +
         cos(lat1) * cos(lat2) *
         sin(dlon / 2) ** 2)

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return EARTH_RADIUS * c

def nearest_nodes(nodes, k=7):
    graph = {}

    for node in nodes:
        current = []

        for other in nodes:
            if node["id"] == other["id"]:
                continue

            d = haversine(
                node["lat"],
                node["lng"],
                other["lat"],
                other["lng"]
            )

            current.append({
                "node": other["id"],
                "distance": round(d, 2)
            })

        current.sort(key=lambda x: x["distance"])
        graph[node["id"]] = current[:k]

    return graph

if __name__ == "__main__":
    nodes_data = Nodes()
    print(type(nodes_data))

    nearest = nearest_nodes(nodes_data, k=10)

    output_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "data",
        "nearest_nodes.json"
    )

    with open(output_path, "w") as f:
        json.dump(nearest, f, indent=4)