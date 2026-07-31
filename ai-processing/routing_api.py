from fastapi import APIRouter
from models import RouteRequest

router = APIRouter(
    prefix="/api/v1/navigation",
    tags=["Navigation"]
)


@router.post("/route")
async def get_shortest_route(request: RouteRequest):
    """
    Receives the user's current GPS location and destination.

    Graph Team will later replace this function with the
    shortest path algorithm.
    """

    # TODO (Graph Team)
    # Example:
    #
    # route = find_shortest_path(
    #     latitude=request.latitude,
    #     longitude=request.longitude,
    #     destination=request.destination
    # )
    #
    # return route

    return {
        "success": True,
        "message": "Routing request received.",
        "request": request.model_dump()
    }