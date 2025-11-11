// API Types
export interface Doctor {
  _id?: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  image?: string;
  phone?: string;
  email?: string;
  bio?: string;
  available_days?: string[];
  available_hours?: string;
  consultation_fee?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DoctorCreate {
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  image?: string;
  phone?: string;
  email?: string;
  bio?: string;
  available_days?: string[];
  available_hours?: string;
  consultation_fee?: number;
}

export interface DoctorUpdate {
  name?: string;
  specialty?: string;
  qualification?: string;
  experience?: string;
  image?: string;
  phone?: string;
  email?: string;
  bio?: string;
  available_days?: string[];
  available_hours?: string;
  consultation_fee?: number;
}

export interface Service {
  _id?: string;
  name: string;
  description: string;
  icon?: string;
  price?: number;
  duration?: string;
  department?: string;
  available?: boolean;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ServiceCreate {
  name: string;
  description: string;
  icon?: string;
  price?: number;
  duration?: string;
  department?: string;
  available?: boolean;
  features?: string[];
}

export interface ServiceUpdate {
  name?: string;
  description?: string;
  icon?: string;
  price?: number;
  duration?: string;
  department?: string;
  available?: boolean;
  features?: string[];
}

export interface Appointment {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  doctor_id?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentCreate {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  doctor_id?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

export interface AppointmentUpdate {
  status?: "pending" | "confirmed" | "cancelled" | "completed";
  doctor_id?: string;
  preferred_date?: string;
  preferred_time?: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Legacy types for compatibility with existing components
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
