from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId
from datetime import datetime

from database.connection import db
from database.models import Doctor, DoctorCreate, DoctorUpdate

router = APIRouter(prefix="/api/doctors", tags=["doctors"])

# Collection
doctors_collection = db.doctors

@router.get("/", response_model=List[Doctor])
async def get_all_doctors():
    """Get all doctors"""
    try:
        doctors = []
        cursor = doctors_collection.find({})
        async for doctor in cursor:
            doctors.append(Doctor(**doctor))
        return doctors
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching doctors: {str(e)}"
        )

@router.get("/{doctor_id}", response_model=Doctor)
async def get_doctor_by_id(doctor_id: str):
    """Get a doctor by ID"""
    try:
        if not ObjectId.is_valid(doctor_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid doctor ID format"
            )
        
        doctor = await doctors_collection.find_one({"_id": ObjectId(doctor_id)})
        if not doctor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Doctor not found"
            )
        
        return Doctor(**doctor)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching doctor: {str(e)}"
        )

@router.post("/", response_model=Doctor)
async def create_doctor(doctor_data: DoctorCreate):
    """Create a new doctor"""
    try:
        doctor_dict = doctor_data.dict()
        doctor_dict["created_at"] = datetime.now()
        doctor_dict["updated_at"] = datetime.now()
        
        result = await doctors_collection.insert_one(doctor_dict)
        
        if result.inserted_id:
            created_doctor = await doctors_collection.find_one({"_id": result.inserted_id})
            return Doctor(**created_doctor)
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create doctor"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating doctor: {str(e)}"
        )

@router.put("/{doctor_id}", response_model=Doctor)
async def update_doctor(doctor_id: str, doctor_data: DoctorUpdate):
    """Update a doctor"""
    try:
        if not ObjectId.is_valid(doctor_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid doctor ID format"
            )
        
        # Get existing doctor
        existing_doctor = await doctors_collection.find_one({"_id": ObjectId(doctor_id)})
        if not existing_doctor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Doctor not found"
            )
        
        # Update only provided fields
        update_data = {k: v for k, v in doctor_data.dict().items() if v is not None}
        if update_data:
            update_data["updated_at"] = datetime.now()
            
            result = await doctors_collection.update_one(
                {"_id": ObjectId(doctor_id)},
                {"$set": update_data}
            )
            
            if result.modified_count:
                updated_doctor = await doctors_collection.find_one({"_id": ObjectId(doctor_id)})
                return Doctor(**updated_doctor)
        
        return Doctor(**existing_doctor)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating doctor: {str(e)}"
        )

@router.delete("/{doctor_id}")
async def delete_doctor(doctor_id: str):
    """Delete a doctor"""
    try:
        if not ObjectId.is_valid(doctor_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid doctor ID format"
            )
        
        result = await doctors_collection.delete_one({"_id": ObjectId(doctor_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Doctor not found"
            )
        
        return {"message": "Doctor deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting doctor: {str(e)}"
        )

