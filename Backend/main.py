from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from database.connection import db
from routes.doctors import router as doctor_router
from routes.services import router as services_router
from routes.appointments import router as appointments_router

app = FastAPI(
    title="Curoo Medical Center API",
    description="API for managing doctors, services, and appointments",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base router
base_router = APIRouter(prefix="/curoo")

# Include all routers
base_router.include_router(doctor_router)
base_router.include_router(services_router)
base_router.include_router(appointments_router)

# Add base router to app
app.include_router(base_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Curoo Medical Center API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0", 
        port=8000,
        reload=True
    )

