import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Heart,
  CheckCircle,
  X,
} from "lucide-react";
import { AppointmentForm as AppointmentFormType } from "../types";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<AppointmentFormType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = [
    "Cardiology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Emergency Care",
    "Radiology",
    "General Medicine",
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Auto close modal after 3 seconds on successful submission
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all">
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <X size={20} />
          </button>

          {/* Modal Content */}
          <div className="relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-medical-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Calendar
                    className="text-medical-500 animate-bounce"
                    size={28}
                  />
                  <span className="text-medical-600 font-semibold text-lg">
                    Book Your Appointment
                  </span>
                  <Heart className="text-accent-500 animate-pulse" size={28} />
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-medical-600 via-accent-500 to-medical-500 bg-clip-text text-transparent">
                    Schedule Your Visit
                  </span>
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Fill out the form below and we'll get back to you within 24
                  hours to confirm your appointment. ✨
                </p>
              </div>

              {/* Success State */}
              {isSubmitted && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Appointment Booked Successfully! 🎉
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for choosing Curoo Health Care. We'll contact
                    you within 24 hours to confirm your appointment details.
                  </p>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <p className="text-green-700 font-medium">
                      📧 A confirmation email has been sent to your registered
                      email address.
                    </p>
                  </div>
                </div>
              )}

              {/* Form */}
              {!isSubmitted && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                        <User className="inline mr-2" size={16} />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                        <User className="inline mr-2" size={16} />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                        <Mail className="inline mr-2" size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                        <Phone className="inline mr-2" size={16} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                        <Heart className="inline mr-2" size={16} />
                        Department *
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300 bg-white"
                      >
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                          <Calendar className="inline mr-2" size={16} />
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                          <Clock className="inline mr-2" size={16} />
                          Preferred Time *
                        </label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300 bg-white"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-medical-600 transition-colors">
                        <MessageSquare className="inline mr-2" size={16} />
                        Additional Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 transition-all duration-300 group-hover:border-medical-300 resize-none"
                        placeholder="Please describe your symptoms or reason for visit (optional)"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-medical-600 via-accent-500 to-medical-500 text-white py-4 rounded-xl hover:shadow-2xl hover:shadow-medical-500/25 transition-all duration-500 font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden relative"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-medical-500 via-accent-500 to-medical-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative flex items-center justify-center space-x-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Booking Appointment...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles
                              className="group-hover:animate-spin"
                              size={20}
                            />
                            <span>Book Appointment</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Note */}
                  <p className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                    <span className="font-medium">📝 Note:</span> All
                    appointments are subject to doctor availability. We'll
                    contact you to confirm your preferred time slot.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
