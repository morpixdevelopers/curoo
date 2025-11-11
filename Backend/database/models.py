from pydantic import BaseModel, Field, GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema
from typing import Optional, List, Any
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, _source_type: Any, _handler: Any
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.chain_schema([
                    core_schema.str_schema(),
                    core_schema.no_info_plain_validator_function(cls.validate),
                ])
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            ),
        )

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls, _core_schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        return {"type": "string"}

class Doctor(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    specialty: str
    qualification: str
    experience: str
    image: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    bio: Optional[str] = None
    available_days: Optional[List[str]] = []
    available_hours: Optional[str] = None
    consultation_fee: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class DoctorCreate(BaseModel):
    name: str
    specialty: str
    qualification: str
    experience: str
    image: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    bio: Optional[str] = None
    available_days: Optional[List[str]] = []
    available_hours: Optional[str] = None
    consultation_fee: Optional[float] = None

class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    specialty: Optional[str] = None
    qualification: Optional[str] = None
    experience: Optional[str] = None
    image: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    bio: Optional[str] = None
    available_days: Optional[List[str]] = None
    available_hours: Optional[str] = None
    consultation_fee: Optional[float] = None

class Service(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    description: str
    icon: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None
    department: Optional[str] = None
    available: bool = True
    features: Optional[List[str]] = []
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class ServiceCreate(BaseModel):
    name: str
    description: str
    icon: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None
    department: Optional[str] = None
    available: bool = True
    features: Optional[List[str]] = []

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None
    department: Optional[str] = None
    available: Optional[bool] = None
    features: Optional[List[str]] = None

class Appointment(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    first_name: str
    last_name: str
    email: str
    phone: str
    department: str
    doctor_id: Optional[PyObjectId] = None
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None
    status: str = "pending"  # pending, confirmed, cancelled, completed
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str}
    }

class AppointmentCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    department: str
    doctor_id: Optional[str] = None
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None

class AppointmentUpdate(BaseModel):
    status: Optional[str] = None
    doctor_id: Optional[str] = None
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None