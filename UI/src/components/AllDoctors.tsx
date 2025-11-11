import React, { useState, useEffect } from "react";
import { Award, Star, Phone, Mail, Clock, ArrowLeft } from "lucide-react";
import { api } from "../services/api";
import { Doctor } from "../types/api";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AllDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDoctor, setHoveredDoctor] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const doctorsData = await api.doctors.getAll();
        setDoctors(doctorsData);
      } catch (err) {
        console.error("Error loading doctors:", err);
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  if (loading) {
    return (
      <>
        <Header onBookAppointment={() => {}} />
        <section className="relative py-20 bg-gradient-to-br from-white via-medical-50/30 to-accent-50/30 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-medical-600">Loading doctors...</div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header onBookAppointment={() => {}} />
        <section className="relative py-20 bg-gradient-to-br from-white via-medical-50/30 to-accent-50/30 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header onBookAppointment={() => {}} />
      <section className="relative py-20 bg-gradient-to-br from-white via-medical-50/30 to-accent-50/30 min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-40 left-10 w-72 h-72 bg-medical-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-40 right-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mb-8 flex items-center space-x-2 text-medical-600 hover:text-medical-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </button>

          {/* Section Header */}
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="text-medical-500 animate-spin-slow" size={24} />
              <span className="text-medical-600 font-semibold">
                Our Medical Team
              </span>
              <Star className="text-accent-500 animate-spin-slow" size={24} />
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-medical-600 via-accent-500 to-medical-600 bg-clip-text text-transparent mb-6">
              Meet Our Expert Doctors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to your health and well-being ✨
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp animation-delay-600">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="relative group"
                onMouseEnter={() => setHoveredDoctor(doctor._id || null)}
                onMouseLeave={() => setHoveredDoctor(null)}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-medical-500/20 transition-all duration-500 overflow-hidden border border-medical-100/50 transform hover:scale-105 hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={
                        doctor.image ||
                        "https://via.placeholder.com/400x400?text=Doctor"
                      }
                      alt={doctor.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-900/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-medical-600 to-accent-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                      {doctor.specialty}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-medical-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <Award className="text-accent-500" size={18} />
                      <span className="text-sm">{doctor.qualification}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-4">
                      <Clock className="text-medical-500" size={18} />
                      <span className="text-sm">{doctor.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Card with Detailed Info */}
                {hoveredDoctor === doctor._id && (
                  <div className="absolute top-0 left-0 w-full h-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-medical-500 z-10 p-6 animate-fadeIn">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-medical-600 mb-3">
                          {doctor.name}
                        </h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex items-start space-x-2">
                            <Award
                              className="text-accent-500 flex-shrink-0 mt-1"
                              size={18}
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">
                                Qualification
                              </p>
                              <p className="text-sm text-gray-600">
                                {doctor.qualification}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Clock
                              className="text-medical-500 flex-shrink-0 mt-1"
                              size={18}
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-700">
                                Experience
                              </p>
                              <p className="text-sm text-gray-600">
                                {doctor.experience}
                              </p>
                            </div>
                          </div>
                          {doctor.phone && (
                            <div className="flex items-start space-x-2">
                              <Phone
                                className="text-green-500 flex-shrink-0 mt-1"
                                size={18}
                              />
                              <div>
                                <p className="text-sm font-semibold text-gray-700">
                                  Phone
                                </p>
                                <p className="text-sm text-gray-600">
                                  {doctor.phone}
                                </p>
                              </div>
                            </div>
                          )}
                          {doctor.email && (
                            <div className="flex items-start space-x-2">
                              <Mail
                                className="text-blue-500 flex-shrink-0 mt-1"
                                size={18}
                              />
                              <div>
                                <p className="text-sm font-semibold text-gray-700">
                                  Email
                                </p>
                                <p className="text-sm text-gray-600 break-all">
                                  {doctor.email}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        {doctor.bio && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              About
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {doctor.bio}
                            </p>
                          </div>
                        )}
                      </div>

                      {doctor.consultation_fee && (
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Consultation Fee
                            </span>
                            <span className="text-lg font-bold text-medical-600">
                              ${doctor.consultation_fee}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllDoctors;
