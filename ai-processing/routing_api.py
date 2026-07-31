##im getting lat long and desti and parameters and have to transfer this to routing_graph 
from fastapi import FastAPI
from pydantic import BaseModel


# -----------------------------
# Request Model
# -----------------------------
class RouteRequest(BaseModel):
    latitude: float
    longitude: float
    destination: str


# -----------------------------
# Response Model (Optional)
# -----------------------------
class RouteResponse(BaseModel):
    success: bool
    message: str
    latitude: float
    longitude: float
    destination: str


# -----------------------------
# Navigation API
# -----------------------------
@app.post(
    "/api/v1/navigation/route",
    response_model=RouteResponse
)
async def get_shortest_route(request: RouteRequest):

    """
    Receives:
    - User Latitude
    - User Longitude
    - Destination

    Graph Team will later compute the shortest path.
    """

    # -------------------------------------------------
    # TODO:
    # Graph teammate will replace this section with:
    #
    # route = find_shortest_path(
    #     latitude=request.latitude,
    #     longitude=request.longitude,
    #     destination=request.destination
    # )
    #
    # return route
    # -------------------------------------------------

    return RouteResponse(
        success=True,
        message="Routing request received successfully.",
        latitude=request.latitude,
        longitude=request.longitude,
        destination=request.destination
    )