from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph_builder import load_nodes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

NON_DESTINATION_TYPES = {"junction", "road", "entrance"}


@app.get("/nodes")
def get_nodes():
    nodes = load_nodes()
    # only real, user-facing destinations — hides internal routing points
    destinations = {
        node_id: n for node_id, n in nodes.items()
        if n.get("type") not in NON_DESTINATION_TYPES
    }
    return destinations

from fastapi import HTTPException
from pydantic import BaseModel
from graph_builder import load_edges, build_graph
from routing import shortest_path_dijkstra, shortest_path_astar


class RouteRequest(BaseModel):
    from_id: str
    to_id: str
    accessible: bool = False
    algo: str = "astar"


@app.post("/route")
def get_route(req: RouteRequest):
    nodes = load_nodes()
    edges = load_edges()

    if req.from_id not in nodes:
        raise HTTPException(status_code=404, detail=f"'{req.from_id}' is not a known location ID.")
    if req.to_id not in nodes:
        raise HTTPException(status_code=404, detail=f"'{req.to_id}' is not a known location ID.")
    if req.from_id == req.to_id:
        raise HTTPException(status_code=400, detail="Start and destination are the same.")

    G = build_graph(nodes, edges, accessible_only=req.accessible)

    if req.algo == "dijkstra":
        path, distance = shortest_path_dijkstra(G, req.from_id, req.to_id)
    else:
        path, distance = shortest_path_astar(G, req.from_id, req.to_id)

    if path is None:
        raise HTTPException(status_code=404, detail="No route found — it may be blocked.")

    return {
        "route": path,
        "coords": [[nodes[n]["lat"], nodes[n]["lng"]] for n in path],
        "distance_m": round(distance),
        "accessible": req.accessible,
        "algorithm": req.algo,
    }

from routing import get_top_routes


@app.post("/route/alternates")
def get_route_alternates(req: RouteRequest):
    nodes = load_nodes()
    edges = load_edges()

    if req.from_id not in nodes:
        raise HTTPException(status_code=404, detail=f"'{req.from_id}' is not a known location ID.")
    if req.to_id not in nodes:
        raise HTTPException(status_code=404, detail=f"'{req.to_id}' is not a known location ID.")
    if req.from_id == req.to_id:
        raise HTTPException(status_code=400, detail="Start and destination are the same.")

    G = build_graph(nodes, edges, accessible_only=req.accessible)
    routes = get_top_routes(G, req.from_id, req.to_id, k=2)

    if not routes:
        raise HTTPException(status_code=404, detail="No route found — it may be blocked.")

    for r in routes:
        r["coords"] = [[nodes[n]["lat"], nodes[n]["lng"]] for n in r["route"]]

    return {"routes": routes, "accessible": req.accessible}
