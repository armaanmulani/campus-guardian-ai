import networkx as nx
from graph_builder import load_nodes, load_edges, build_graph
from distance_calculation import haversine

def block_edge(edges, edge_id, reason="Path blocked"):
    edges[edge_id]["blocked"] = True
    edges[edge_id]["reason"] = reason
    return edges


def unblock_edge(edges, edge_id):
    edges[edge_id]["blocked"] = False
    edges[edge_id]["reason"] = None
    return edges

def shortest_path_dijkstra(G, start, end):
    try:
        path = nx.dijkstra_path(G, start, end, weight="weight")
        distance = nx.dijkstra_path_length(G, start, end, weight="weight")
        return path, distance
    except nx.NetworkXNoPath:
        return None, None
    
def haversine_heuristic(G, n1, n2):
    return haversine(
        G.nodes[n1]["lat"],
        G.nodes[n1]["lng"],
        G.nodes[n2]["lat"],
        G.nodes[n2]["lng"]
    )

def shortest_path_astar(G, start, end):
    try:
        path = nx.astar_path(G, start, end, heuristic=lambda a, b: haversine_heuristic(G, a, b), weight="weight")
        distance = nx.astar_path_length(G, start, end, heuristic=lambda a, b: haversine_heuristic(G, a, b), weight="weight")
        return path, distance
    except nx.NetworkXNoPath:
        return None, None

if __name__ == "__main__":
    nodes = load_nodes()
    edges = load_edges()
    G = build_graph(nodes, edges)

    path, distance = shortest_path_dijkstra(G, "MainGate", "BH5")
    print("Route (Dijkstra):")
    print(" -> ".join(path))
    print(f"Distance: {distance} m")
    path2, distance2 = shortest_path_astar(G, "MainGate", "BH5")
    print("Route (A*):")
    print(" -> ".join(path2))
    print(f"Distance: {distance2} m")
    
    edges = block_edge(edges, "E33", "Construction near BH3")

    G2 = build_graph(nodes, edges)
    path3, distance3 = shortest_path_dijkstra(G2, "MainGate", "BH5")
    print("New route:")
    print(" -> ".join(path3))
    print(f"New distance: {distance3} m")