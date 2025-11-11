from pydantic import BaseModel


class Doctors(BaseModel):
  name : str
  experience : int
  specialization : str
  img : str


