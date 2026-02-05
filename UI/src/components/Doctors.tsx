import React, { useEffect, useState } from "react";
import {
  Award,
  Clock,
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { api } from "../services/api";
import { Doctor } from "../types/api";

interface DoctorsProps {
  onBookAppointment?: () => void;
}

const Doctors: React.FC<DoctorsProps> = ({ onBookAppointment }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await api.doctors.getAll();
        setDoctors(data);
      } catch {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  if (loading || error || doctors.length < 3) {
    return (
      <section className="py-20 text-center text-lg text-medical-600">
        {loading ? "Loading doctors..." : error}
      </section>
    );
  }

  const total = doctors.length;
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  const moveNext = () => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % total);
  };

  const movePrev = () => {
    setDirection("left");
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  return (
    <section
      id="doctors"
      className="py-32 bg-gradient-to-br from-white via-medical-50/30 to-accent-50/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="flex justify-center gap-2 mb-4">
            <Star className="text-medical-500 animate-spin-slow" />
            <span className="text-medical-600 font-semibold">
              Our Medical Team
            </span>
            <Star className="text-accent-500 animate-spin-slow" />
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-medical-600 via-accent-500 to-medical-500 bg-clip-text text-transparent">
            Meet Our Expert Doctors
          </h2>
        </div>

        {/* CAROUSEL */}
        <div className="relative flex items-center justify-center">

          {/* LEFT BUTTON */}
          <button
            onClick={movePrev}
            className="absolute left-0 z-30 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>

          {/* CARDS */}
          <div className="flex items-center justify-center gap-10 w-full max-w-5xl">
            {[prevIndex, current, nextIndex].map((index, pos) => {
              const doctor = doctors[index];
              const isCenter = pos === 1;

              return (
                <div
                  key={doctor._id}
                  className={`transition-all duration-500 ease-in-out
                    ${
                      isCenter
                        ? "scale-110 z-20 opacity-100"
                        : "scale-90 opacity-70"
                    }`}
                >
                  <div className="w-80 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-64 object-cover"
                    />

                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-medical-600 mb-2">
                        {doctor.name}
                      </h3>

                      <div className="flex justify-center gap-2 text-sm mb-2">
                        <Award size={16} />
                        {doctor.qualification}
                      </div>

                      <div className="flex justify-center gap-2 text-sm mb-4">
                        <Clock size={16} />
                        {doctor.experience}
                      </div>

                      <button
                        onClick={onBookAppointment}
                        className="w-full bg-gradient-to-r from-medical-600 to-accent-500 text-white py-3 rounded-xl hover:scale-105 transition"
                      >
                        <Sparkles className="inline mr-2" size={16} />
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={moveNext}
            className="absolute right-0 z-30 bg-white shadow-lg rounded-full p-3 hover:scale-110 transition"
          >
            <ChevronRight />
          </button>
        </div>

        {/* SEE ALL DOCTORS */}
        <div className="text-center mt-20">
          <a
            href="/all-doctors"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-medical-600 to-accent-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transition"
          >
            See All Doctors
            <Award />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
