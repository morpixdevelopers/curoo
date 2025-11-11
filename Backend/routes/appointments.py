from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from bson import ObjectId
from datetime import datetime

from database.connection import db
from database.models import Appointment, AppointmentCreate, AppointmentUpdate

router = APIRouter(prefix="/api/appointments", tags=["appointments"])

# Collection
appointments_collection = db.appointments

@router.get("/", response_model=List[Appointment])
async def get_all_appointments(status_filter: Optional[str] = None):
    """Get all appointments with optional status filter"""
    try:
        query = {}
        if status_filter:
            query["status"] = status_filter
        
        appointments = []
        cursor = appointments_collection.find(query).sort("created_at", -1)
        async for appointment in cursor:
            appointments.append(Appointment(**appointment))
        return appointments
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching appointments: {str(e)}"
        )

@router.get("/{appointment_id}", response_model=Appointment)
async def get_appointment_by_id(appointment_id: str):
    """Get an appointment by ID"""
    try:
        if not ObjectId.is_valid(appointment_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid appointment ID format"
            )
        
        appointment = await appointments_collection.find_one({"_id": ObjectId(appointment_id)})
        if not appointment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Appointment not found"
            )
        
        return Appointment(**appointment)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching appointment: {str(e)}"
        )

@router.post("/", response_model=Appointment)
async def create_appointment(appointment_data: AppointmentCreate):
    """Create a new appointment"""
    try:
        appointment_dict = appointment_data.dict()
        appointment_dict["created_at"] = datetime.now()
        appointment_dict["updated_at"] = datetime.now()
        appointment_dict["status"] = "pending"
        
        # Convert doctor_id string to ObjectId if provided
        if appointment_dict.get("doctor_id"):
            if ObjectId.is_valid(appointment_dict["doctor_id"]):
                appointment_dict["doctor_id"] = ObjectId(appointment_dict["doctor_id"])
            else:
                appointment_dict["doctor_id"] = None
        
        result = await appointments_collection.insert_one(appointment_dict)
        
        if result.inserted_id:
            created_appointment = await appointments_collection.find_one({"_id": result.inserted_id})
            return Appointment(**created_appointment)
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create appointment"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating appointment: {str(e)}"
        )

@router.put("/{appointment_id}", response_model=Appointment)
async def update_appointment(appointment_id: str, appointment_data: AppointmentUpdate):
    """Update an appointment"""
    try:
        if not ObjectId.is_valid(appointment_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid appointment ID format"
            )
        
        # Get existing appointment
        existing_appointment = await appointments_collection.find_one({"_id": ObjectId(appointment_id)})
        if not existing_appointment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Appointment not found"
            )
        
        # Update only provided fields
        update_data = {k: v for k, v in appointment_data.dict().items() if v is not None}
        if update_data:
            update_data["updated_at"] = datetime.now()
            
            # Convert doctor_id string to ObjectId if provided
            if update_data.get("doctor_id"):
                if ObjectId.is_valid(update_data["doctor_id"]):
                    update_data["doctor_id"] = ObjectId(update_data["doctor_id"])
                else:
                    update_data["doctor_id"] = None
            
            result = await appointments_collection.update_one(
                {"_id": ObjectId(appointment_id)},
                {"$set": update_data}
            )
            
            if result.modified_count:
                updated_appointment = await appointments_collection.find_one({"_id": ObjectId(appointment_id)})
                return Appointment(**updated_appointment)
        
        return Appointment(**existing_appointment)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating appointment: {str(e)}"
        )

@router.delete("/{appointment_id}")
async def delete_appointment(appointment_id: str):
    """Delete an appointment"""
    try:
        if not ObjectId.is_valid(appointment_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid appointment ID format"
            )
        
        result = await appointments_collection.delete_one({"_id": ObjectId(appointment_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Appointment not found"
            )
        
        return {"message": "Appointment deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting appointment: {str(e)}"
        )

@router.get("/doctor/{doctor_id}", response_model=List[Appointment])
async def get_appointments_by_doctor(doctor_id: str):
    """Get appointments by doctor ID"""
    try:
        if not ObjectId.is_valid(doctor_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid doctor ID format"
            )
        
        appointments = []
        cursor = appointments_collection.find({"doctor_id": ObjectId(doctor_id)}).sort("created_at", -1)
        async for appointment in cursor:
            appointments.append(Appointment(**appointment))
        return appointments
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching appointments by doctor: {str(e)}"
        )