import json
import os
import networkx as nx
from distance_calculation import haversine

BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # graphs-routing-engine/
DATA_DIR = os.path.join(BASE_DIR, "data")


def load_nodes():
    with open(os.path.join(DATA_DIR, "nodes.json")) as f:
        return json.load(f)


def load_edges():
    with open(os.path.join(DATA_DIR, "edges.json")) as f:
        return json.load(f)


def build_graph(nodes, edges, accessible_only=False):
    G = nx.Graph()

    for node_id, data in nodes.items():
        G.add_node(node_id, **data)

    for edge_id, e in edges.items():
        if e["blocked"]:
            continue
        if accessible_only and not e["accessible"]:
            continue
        u = nodes[e["from"]]
        v = nodes[e["to"]]

        distance = haversine(
          u["lat"], u["lng"],
          v["lat"], v["lng"]
        )

        G.add_edge(
          e["from"],
          e["to"],
          weight=round(distance, 2),
          edge_id=edge_id
        )

    return G

def check_connectivity(G):
    if nx.is_connected(G):
        print("Graph is fully connected — every node can reach every other node.")
    else:
        components = list(nx.connected_components(G))
        print(f"WARNING: Graph is NOT fully connected. Found {len(components)} separate groups:")
        for i, comp in enumerate(components, 1):
            print(f"  Group {i} ({len(comp)} nodes): {comp}")

if __name__ == "__main__":
    nodes = load_nodes()
    edges = load_edges()
    print(f"Loaded {len(nodes)} nodes and {len(edges)} edges.")

    G = build_graph(nodes, edges)
    print(f"Graph has {G.number_of_nodes()} nodes and {G.number_of_edges()} edges.")
    check_connectivity(G)