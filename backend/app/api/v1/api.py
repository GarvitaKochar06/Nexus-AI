from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, dashboard, memory, lifeos, career, billing, cyber_hub
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(memory.router, prefix="/memory", tags=["Personal Memory Engine"])
api_router.include_router(lifeos.router, prefix="/lifeos", tags=["LifeOS"])
api_router.include_router(career.router, prefix="/career", tags=["CareerOS"])
api_router.include_router(billing.router, prefix="/billing", tags=["Billing & Monetization"])
api_router.include_router(cyber_hub.router, prefix="/cyber-hub", tags=["Cyber Hub"])
api_router.include_router(app.api.v1.endpoints.ai.router, prefix="/ai", tags=["AI Service"])
