import json
from pathlib import Path
import folium

# ----------------------------
# Paths
# ----------------------------
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR.parent / "data"

# ----------------------------
# Load Data
# ----------------------------
with open(DATA_DIR / "nodes.json", "r") as f:
    nodes = json.load(f)

with open(DATA_DIR / "edges.json", "r") as f:
    edges = json.load(f)

# ----------------------------
# Map Center
# ----------------------------
avg_lat = sum(node["lat"] for node in nodes.values()) / len(nodes)
avg_lng = sum(node["lng"] for node in nodes.values()) / len(nodes)

campus = folium.Map(
    location=[avg_lat, avg_lng],
    zoom_start=17,
    tiles=None,
    control_scale=True
)

# ----------------------------
# Base Maps
# ----------------------------
folium.TileLayer(
    "OpenStreetMap",
    name="Street Map"
).add_to(campus)

folium.TileLayer(
    tiles="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr="Esri",
    name="Satellite"
).add_to(campus)

# ----------------------------
# Marker Color
# ----------------------------
def marker_color(name):

    name = name.upper()

    if name == "MAINGATE":
        return "green"

    if name.startswith("AB"):
        return "blue"

    if name.startswith("GH"):
        return "orange"

    if name.startswith("BH"):
        return "red"

    if "JUNCTION" in name:
        return "purple"

    return "cadetblue"

# ----------------------------
# Draw Roads
# ----------------------------
for edge in edges.values():

    u = edge["from"]
    v = edge["to"]

    if u not in nodes or v not in nodes:
        continue

    folium.PolyLine(
        [
            [nodes[u]["lat"], nodes[u]["lng"]],
            [nodes[v]["lat"], nodes[v]["lng"]],
        ],
        color="gray",
        weight=4,
        opacity=0.8,
        tooltip=f"{u} → {v}"
    ).add_to(campus)

# ----------------------------
# Draw Nodes
# ----------------------------
for name, node in nodes.items():

    folium.CircleMarker(
        location=[node["lat"], node["lng"]],
        radius=6,
        color=marker_color(name),
        fill=True,
        fill_color=marker_color(name),
        fill_opacity=1,
        popup=f"<b>{name}</b>",
        tooltip=name
    ).add_to(campus)

# ----------------------------
# Layer Control
# ----------------------------
folium.LayerControl().add_to(campus)

# ----------------------------
# Save
# ----------------------------
output = BASE_DIR / "campus_map.html"
campus.save(output)

print(f"Campus map saved to {output}")