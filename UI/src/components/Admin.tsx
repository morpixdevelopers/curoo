import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Settings,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  User,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  Heart,
  Home,
  Save,
  X,
  Upload,
  Image,
  FileText,
  Award,
  Stethoscope,
} from "lucide-react";
import {
  doctors as initialDoctors,
  services as initialServices,
} from "../data/hospitalData";
import { AppointmentForm } from "../types";

interface Appointment extends AppointmentForm {
  id: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  image: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for doctors
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, "id">>({
    name: "",
    specialty: "",
    qualification: "",
    experience: "",
    image: "",
  });

  // State for services
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    name: "",
    description: "",
  });

  // State for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      department: "Cardiology",
      preferredDate: "2024-10-10",
      preferredTime: "10:00",
      message: "Regular checkup",
      status: "pending",
      createdAt: "2024-10-04",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      department: "Pediatrics",
      preferredDate: "2024-10-12",
      preferredTime: "14:30",
      message: "Child vaccination",
      status: "confirmed",
      createdAt: "2024-10-03",
    },
    {
      id: "3",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.j@email.com",
      phone: "+1 (555) 456-7890",
      department: "Orthopedics",
      preferredDate: "2024-10-15",
      preferredTime: "09:00",
      message: "Knee pain consultation",
      status: "cancelled",
      createdAt: "2024-10-02",
    },
  ]);

  // Utility functions
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleFileUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-50";
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      case "completed":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle size={16} />;
      case "confirmed":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  // Doctor CRUD operations
  const handleAddDoctor = () => {
    if (newDoctor.name && newDoctor.specialty) {
      const doctor: Doctor = {
        ...newDoctor,
        id: generateId(),
      };
      setDoctors([...doctors, doctor]);
      setNewDoctor({
        name: "",
        specialty: "",
        qualification: "",
        experience: "",
        image: "",
      });
      setShowAddDoctorModal(false);
    }
  };

  const handleEditDoctor = (id: string, updatedDoctor: Partial<Doctor>) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === id ? { ...doctor, ...updatedDoctor } : doctor
      )
    );
  };

  const handleDeleteDoctor = (id: string) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    }
  };

  // Service CRUD operations
  const handleAddService = () => {
    if (newService.name && newService.description) {
      const service: Service = {
        ...newService,
        id: generateId(),
      };
      setServices([...services, service]);
      setNewService({
        name: "",
        description: "",
      });
      setShowAddServiceModal(false);
    }
  };

  const handleEditService = (id: string, updatedService: Partial<Service>) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, ...updatedService } : service
      )
    );
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== id));
    }
  };

  // Appointment operations
  const handleUpdateAppointmentStatus = (id: string, status: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: status as any }
          : appointment
      )
    );
  };

  const handleDeleteAppointment = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    }
  };

  const exportData = () => {
    const data = {
      doctors,
      services,
      appointments,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `curoo-admin-data-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || appointment.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-medical-50 to-accent-50 rounded-2xl p-6 border border-medical-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-medical-600 text-sm font-medium">
                Total Appointments
              </p>
              <p className="text-3xl font-bold text-medical-700">
                {appointments.length}
              </p>
            </div>
            <Calendar className="text-medical-500" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">
                Active Doctors
              </p>
              <p className="text-3xl font-bold text-green-700">
                {doctors.length}
              </p>
            </div>
            <Users className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Services</p>
              <p className="text-3xl font-bold text-blue-700">
                {services.length}
              </p>
            </div>
            <Heart className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-purple-700">
                {appointments.filter((a) => a.status === "pending").length}
              </p>
            </div>
            <AlertCircle className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <Calendar className="text-medical-500" size={24} />
            <span>Recent Appointments</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.slice(0, 5).map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.firstName} {appointment.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.preferredDate} at {appointment.preferredTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusIcon(appointment.status)}
                      <span className="capitalize">{appointment.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            onClick={exportData}
            className="bg-gradient-to-r from-medical-600 to-accent-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <Calendar className="text-medical-500" size={24} />
            <span>All Appointments ({filteredAppointments.length})</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-medical-100 to-accent-100 rounded-full flex items-center justify-center">
                        <User className="text-medical-600" size={16} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.firstName} {appointment.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {appointment.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center space-x-1">
                      <Mail size={14} className="text-gray-400" />
                      <span>{appointment.email}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Phone size={14} className="text-gray-400" />
                      <span>{appointment.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.preferredDate}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Clock size={14} className="text-gray-400" />
                      <span>{appointment.preferredTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={appointment.status}
                      onChange={(e) =>
                        handleUpdateAppointmentStatus(
                          appointment.id,
                          e.target.value
                        )
                      }
                      className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDoctors = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Doctors Management</h2>
        <button
          onClick={() => setShowAddDoctorModal(true)}
          className="bg-gradient-to-r from-medical-600 to-accent-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Doctor</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={
                  doctor.image ||
                  "https://via.placeholder.com/300x200?text=Doctor"
                }
                alt={doctor.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-medical-600">
                {doctor.specialty}
              </div>
            </div>
            <div className="p-6">
              {editingDoctor === doctor.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={doctor.name}
                    onChange={(e) =>
                      handleEditDoctor(doctor.id, { name: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg text-xl font-bold"
                    placeholder="Doctor Name"
                  />
                  <input
                    type="text"
                    value={doctor.specialty}
                    onChange={(e) =>
                      handleEditDoctor(doctor.id, { specialty: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Specialty"
                  />
                  <input
                    type="text"
                    value={doctor.qualification}
                    onChange={(e) =>
                      handleEditDoctor(doctor.id, {
                        qualification: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Qualification"
                  />
                  <input
                    type="text"
                    value={doctor.experience}
                    onChange={(e) =>
                      handleEditDoctor(doctor.id, {
                        experience: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Experience"
                  />
                  <input
                    type="url"
                    value={doctor.image}
                    onChange={(e) =>
                      handleEditDoctor(doctor.id, { image: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Image URL"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingDoctor(null)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setEditingDoctor(null)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="text-medical-600" size={16} />
                    <p className="text-gray-600">{doctor.qualification}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Stethoscope className="text-accent-600" size={16} />
                    <p className="text-gray-500 text-sm">{doctor.experience}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingDoctor(doctor.id)}
                      className="flex-1 bg-gradient-to-r from-medical-50 to-accent-50 text-medical-600 py-2 px-4 rounded-lg hover:from-medical-100 hover:to-accent-100 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-all duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Services Management
        </h2>
        <button
          onClick={() => setShowAddServiceModal(true)}
          className="bg-gradient-to-r from-medical-600 to-accent-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-100 to-accent-100 rounded-xl flex items-center justify-center">
                <Heart className="text-medical-600" size={24} />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingService(service.id)}
                  className="text-medical-600 hover:text-medical-700 p-1 hover:bg-medical-50 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {editingService === service.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) =>
                    handleEditService(service.id, { name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg text-lg font-bold"
                  placeholder="Service Name"
                />
                <textarea
                  value={service.description}
                  onChange={(e) =>
                    handleEditService(service.id, {
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Service Description"
                  rows={3}
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingService(null)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setEditingService(null)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-medical-50/30 to-accent-50/30">
      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Add New Doctor
              </h3>
              <button
                onClick={() => setShowAddDoctorModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                placeholder="Doctor Name"
              />
              <input
                type="text"
                value={newDoctor.specialty}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, specialty: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                placeholder="Specialty"
              />
              <input
                type="text"
                value={newDoctor.qualification}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, qualification: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                placeholder="Qualification"
              />
              <input
                type="text"
                value={newDoctor.experience}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, experience: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                placeholder="Experience (e.g., 10+ years)"
              />
              <input
                type="url"
                value={newDoctor.image}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, image: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                placeholder="Image URL"
              />
              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={handleAddDoctor}
                  className="flex-1 bg-gradient-to-r from-medical-600 to-accent-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add Doctor</span>
                </button>
                <button
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Add New Service
              </h3>
              <button
                onClick={() => setShowAddServiceModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                placeholder="Service Name"
              />
              <textarea
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
                placeholder="Service Description"
                rows={4}
              />
              <div className="flex items-center space-x-3 mt-6">
                <button
                  onClick={handleAddService}
                  className="flex-1 bg-gradient-to-r from-medical-600 to-accent-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add Service</span>
                </button>
                <button
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for image uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            const imageUrl = await handleFileUpload(file);
            setNewDoctor({ ...newDoctor, image: imageUrl });
          }
        }}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-medical-600 to-accent-500 rounded-xl flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-medical-600 to-accent-500 bg-clip-text text-transparent">
                  Curoo Admin
                </h1>
                <p className="text-sm text-gray-500">
                  Medical Center Management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 bg-gradient-to-r from-medical-50 to-accent-50 text-medical-600 px-4 py-2 rounded-lg hover:from-medical-100 hover:to-accent-100 transition-all duration-300"
              >
                <Home size={18} />
                <span>Back to Website</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-medical-100 to-accent-100 rounded-full flex items-center justify-center">
                <User className="text-medical-600" size={18} />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Admin User
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-6 space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "appointments", label: "Appointments", icon: Calendar },
              { id: "doctors", label: "Doctors", icon: Users },
              { id: "services", label: "Services", icon: Heart },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-medical-50 to-accent-50 text-medical-600 border border-medical-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "appointments" && renderAppointments()}
          {activeTab === "doctors" && renderDoctors()}
          {activeTab === "services" && renderServices()}
          {activeTab === "settings" && (
            <div className="text-center py-12">
              <Settings className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-medium text-gray-600">
                Settings Coming Soon
              </h3>
              <p className="text-gray-500">
                Administrative settings will be available here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
