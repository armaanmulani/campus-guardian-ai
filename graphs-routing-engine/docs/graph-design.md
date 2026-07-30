# Graph Routing Engine Design

## Project Overview

The Graph Routing Engine is responsible for finding the shortest walking path between locations inside the VIT Bhopal campus.

It models the campus as a weighted graph consisting of Points of Interest (POIs), junctions, and connecting paths.

The engine provides routing services to the backend through APIs and supports future features such as blocked roads, accessible routes, and dynamic updates.

## Graph Components

The campus graph consists of three main components:

### 1. Points of Interest (POIs)

Points of Interest (POIs) are real locations on the campus where users can start or end navigation.

Examples include:
- Academic Block 1 (AB01)
- Academic Block 2 (AB02)
- Lab Complex (LC)
- Main Gate
- BH Block 1
- Mayuri Mess
- Morepen Clinic

Each POI has a unique ID and geographic coordinates.
### Node ID Convention

Every node in the graph has a unique short ID.

Examples:

| Location | ID |
|----------|----|
| Main Gate | MG |
| Secondary Gate | SG |
| Academic Block 1 | AB01 |
| Academic Block 2 | AB02 |
| Architecture Block | AR |
| Lab Complex | LC |
| BH Block 1 | BH1 |
| GH Block 1 | GH1 |
| Mayuri Mess | MM |

These IDs are used internally by the routing engine and APIs. Users will see the full location names in the frontend.
