import {
  DoctorCreate,
  DoctorUpdate,
  ServiceCreate,
  ServiceUpdate,
  AppointmentCreate,
  AppointmentUpdate,
} from "../types/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/curoo";

// Generic API function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Doctor API functions
export const doctorAPI = {
  // Get all doctors
  getAll: () => apiCall("/api/doctors"),

  // Get doctor by ID
  getById: (id: string) => apiCall(`/api/doctors/${id}`),

  // Create new doctor
  create: (doctorData: DoctorCreate) =>
    apiCall("/api/doctors", {
      method: "POST",
      body: JSON.stringify(doctorData),
    }),

  // Update doctor
  update: (id: string, doctorData: DoctorUpdate) =>
    apiCall(`/api/doctors/${id}`, {
      method: "PUT",
      body: JSON.stringify(doctorData),
    }),

  // Delete doctor
  delete: (id: string) =>
    apiCall(`/api/doctors/${id}`, {
      method: "DELETE",
    }),

  // Get doctors by specialty
  getBySpecialty: (specialty: string) =>
    apiCall(`/api/doctors/specialty/${specialty}`),
};

// Service API functions
export const serviceAPI = {
  // Get all services
  getAll: () => apiCall("/api/services"),

  // Get service by ID
  getById: (id: string) => apiCall(`/api/services/${id}`),

  // Create new service
  create: (serviceData: ServiceCreate) =>
    apiCall("/api/services", {
      method: "POST",
      body: JSON.stringify(serviceData),
    }),

  // Update service
  update: (id: string, serviceData: ServiceUpdate) =>
    apiCall(`/api/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(serviceData),
    }),

  // Delete service
  delete: (id: string) =>
    apiCall(`/api/services/${id}`, {
      method: "DELETE",
    }),

  // Get services by department
  getByDepartment: (department: string) =>
    apiCall(`/api/services/department/${department}`),
};

// Appointment API functions
export const appointmentsAPI = {
  // Get all appointments
  getAll: (statusFilter?: string) => {
    const endpoint = statusFilter
      ? `/api/appointments?status_filter=${statusFilter}`
      : "/api/appointments";
    return apiCall(endpoint);
  },

  // Get appointment by ID
  getById: (id: string) => apiCall(`/api/appointments/${id}`),

  // Create new appointment
  create: (appointmentData: AppointmentCreate) =>
    apiCall("/api/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    }),

  // Update appointment
  update: (id: string, appointmentData: AppointmentUpdate) =>
    apiCall(`/api/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(appointmentData),
    }),

  // Delete appointment
  delete: (id: string) =>
    apiCall(`/api/appointments/${id}`, {
      method: "DELETE",
    }),

  // Get appointments by doctor
  getByDoctor: (doctorId: string) =>
    apiCall(`/api/appointments/doctor/${doctorId}`),
};

// Health check
export const healthAPI = {
  check: () => apiCall("/health"),
};

// Combined API object
export const api = {
  doctors: doctorAPI,
  services: serviceAPI,
  appointments: appointmentsAPI,
  health: healthAPI,
};
