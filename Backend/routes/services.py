from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId
from datetime import datetime

from database.connection import db
from database.models import Service, ServiceCreate, ServiceUpdate

router = APIRouter(prefix="/api/services", tags=["services"])

# Collection
services_collection = db.services

@router.get("/", response_model=List[Service])
async def get_all_services():
    """Get all services"""
    try:
        services = []
        cursor = services_collection.find({})
        async for service in cursor:
            services.append(Service(**service))
        return services
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching services: {str(e)}"
        )

@router.get("/{service_id}", response_model=Service)
async def get_service_by_id(service_id: str):
    """Get a service by ID"""
    try:
        if not ObjectId.is_valid(service_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid service ID format"
            )
        
        service = await services_collection.find_one({"_id": ObjectId(service_id)})
        if not service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service not found"
            )
        
        return Service(**service)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching service: {str(e)}"
        )

@router.post("/", response_model=Service)
async def create_service(service_data: ServiceCreate):
    """Create a new service"""
    try:
        service_dict = service_data.dict()
        service_dict["created_at"] = datetime.now()
        service_dict["updated_at"] = datetime.now()
        
        result = await services_collection.insert_one(service_dict)
        
        if result.inserted_id:
            created_service = await services_collection.find_one({"_id": result.inserted_id})
            return Service(**created_service)
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create service"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating service: {str(e)}"
        )

@router.put("/{service_id}", response_model=Service)
async def update_service(service_id: str, service_data: ServiceUpdate):
    """Update a service"""
    try:
        if not ObjectId.is_valid(service_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid service ID format"
            )
        
        # Get existing service
        existing_service = await services_collection.find_one({"_id": ObjectId(service_id)})
        if not existing_service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service not found"
            )
        
        # Update only provided fields
        update_data = {k: v for k, v in service_data.dict().items() if v is not None}
        if update_data:
            update_data["updated_at"] = datetime.now()
            
            result = await services_collection.update_one(
                {"_id": ObjectId(service_id)},
                {"$set": update_data}
            )
            
            if result.modified_count:
                updated_service = await services_collection.find_one({"_id": ObjectId(service_id)})
                return Service(**updated_service)
        
        return Service(**existing_service)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating service: {str(e)}"
        )

@router.delete("/{service_id}")
async def delete_service(service_id: str):
    """Delete a service"""
    try:
        if not ObjectId.is_valid(service_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid service ID format"
            )
        
        result = await services_collection.delete_one({"_id": ObjectId(service_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Service not found"
            )
        
        return {"message": "Service deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting service: {str(e)}"
        )

@router.get("/department/{department}", response_model=List[Service])
async def get_services_by_department(department: str):
    """Get services by department"""
    try:
        services = []
        cursor = services_collection.find({"department": {"$regex": department, "$options": "i"}})
        async for service in cursor:
            services.append(Service(**service))
        return services
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching services by department: {str(e)}"
        )