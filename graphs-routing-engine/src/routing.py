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

def nearest_graph_node(nodes, user_lat, user_lng, max_distance_m=None):
    """
    Snap a live GPS point to the closest node in the graph (POI, junction,
    or road point — whichever is physically closest, since the user could
    be standing anywhere on a path, not just at a named location).

    max_distance_m: if given, returns None when even the closest node is
    farther than this (e.g. the user is off-campus / GPS is way off) —
    prevents silently routing from a nonsense starting point.
    """
    best_id, best_dist = None, float("inf")
    for node_id, n in nodes.items():
        d = haversine(user_lat, user_lng, n["lat"], n["lng"])
        if d < best_dist:
            best_id, best_dist = node_id, d

    if max_distance_m is not None and best_dist > max_distance_m:
        return None, best_dist

    return best_id, best_dist


def get_route(nodes, edges, user_lat, user_lng, destination_id, accessible=False, algo="astar"):
    """
    Full pipeline: snap the user's GPS location to the nearest graph node,
    then find the shortest route from there to the destination — respecting
    whatever is currently blocked in edges.json.
    Returns a dict with the result, or an "error" key if something failed.
    """
    if destination_id not in nodes:
        return {"error": f"Unknown destination: {destination_id}"}

    start_id, snap_distance = nearest_graph_node(nodes, user_lat, user_lng, max_distance_m=100)
    if start_id is None:
        return {"error": "location_too_far", "message": "Your location doesn't appear to be on campus."}

    G = build_graph(nodes, edges, accessible_only=accessible)

    if algo == "dijkstra":
        path, distance = shortest_path_dijkstra(G, start_id, destination_id)
    else:
        path, distance = shortest_path_astar(G, start_id, destination_id)

    if path is None:
        message = (
            "No accessible route exists between these points right now."
            if accessible else
            "No route exists between these points right now — it may be blocked."
        )
        return {"error": "no_route_found", "message": message}

    return {
        "snapped_from": start_id,
        "snapped_from_name": nodes[start_id]["name"],
        "snap_distance_m": round(snap_distance),
        "route": path,
        "distance_m": round(distance),
        "accessible": accessible,
        "algorithm": algo,
    }


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

def get_top_routes(G, start, end, k=2):
    """
    Returns up to k distinct shortest routes, ordered shortest to longest —
    same idea as Google Maps showing a primary + alternate route.
    """
    try:
        path_generator = nx.shortest_simple_paths(G, start, end, weight="weight")
        results = []
        for i, path in enumerate(path_generator):
            if i >= k:
                break
            distance = sum(G[u][v]["weight"] for u, v in zip(path[:-1], path[1:]))
            results.append({"route": path, "distance_m": round(distance)})
        return results
    except nx.NetworkXNoPath:
        return []