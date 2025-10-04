export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AppointmentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}