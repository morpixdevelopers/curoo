import React from "react";
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  Sparkles,
  Heart,
  Zap,
} from "lucide-react";

interface HeroProps {
  onBookAppointment?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookAppointment }) => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-16 bg-gradient-to-br from-medical-50 via-accent-50 to-blue-50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-medical-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles
                  className="text-medical-500 animate-spin-slow"
                  size={24}
                />
                <span className="text-medical-600 font-semibold text-lg">
                  Welcome to the Future of Healthcare
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fadeInUp">
                Your Health is Our
                <span className="bg-gradient-to-r from-medical-600 via-accent-500 to-medical-500 bg-clip-text text-transparent block animate-pulse">
                  Priority
                </span>
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed animate-fadeInUp animation-delay-300">
                Experience compassionate, world-class medical care with our team
                of expert physicians and state-of-the-art facilities. ✨ We're
                here for you 24/7.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBookAppointment}
                className="group relative bg-gradient-to-r from-medical-600 via-accent-500 to-medical-500 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-medical-500/25 transition-all duration-500 font-medium flex items-center justify-center space-x-2 transform hover:scale-110 overflow-hidden animate-fadeInUp animation-delay-600"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-medical-500 via-accent-500 to-medical-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <Heart className="relative animate-pulse" size={20} />
                <span className="relative">Book Appointment</span>
                <ArrowRight
                  size={20}
                  className="relative group-hover:translate-x-2 transition-transform duration-300"
                />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="relative border-2 border-medical-500 text-medical-600 px-8 py-4 rounded-full hover:bg-gradient-to-r hover:from-medical-600 hover:via-accent-500 hover:to-medical-500 hover:text-white hover:border-transparent transition-all duration-500 font-medium transform hover:scale-110 animate-fadeInUp animation-delay-800 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-medical-600 via-accent-500 to-medical-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
                <Zap className="inline mr-2 relative" size={20} />
                <span className="relative">Our Services</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fadeInUp animation-delay-1000">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-medical-100 to-accent-100 rounded-2xl mx-auto mb-3 transform hover:scale-110 transition-all duration-300 hover:shadow-lg group">
                  <Users
                    className="text-medical-600 group-hover:animate-bounce"
                    size={28}
                  />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-medical-600 to-accent-500 bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-gray-600 text-sm">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mx-auto mb-3 transform hover:scale-110 transition-all duration-300 hover:shadow-lg group">
                  <Shield
                    className="text-green-600 group-hover:animate-bounce"
                    size={28}
                  />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  25+
                </div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-100 to-medical-100 rounded-2xl mx-auto mb-3 transform hover:scale-110 transition-all duration-300 hover:shadow-lg group">
                  <Clock
                    className="text-accent-600 group-hover:animate-bounce"
                    size={28}
                  />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-medical-500 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-gray-600 text-sm">Emergency Care</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fadeInRight">
            <div className="relative z-10 group">
              <img
                src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical team providing care"
                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover transform group-hover:scale-105 transition-all duration-700 hover:shadow-medical-500/25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-900/20 to-transparent rounded-3xl"></div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-8 left-8 w-full h-full bg-gradient-to-br from-medical-200 to-accent-200 rounded-3xl -z-10 transform rotate-3 animate-float"></div>
            <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-accent-200 to-blue-200 rounded-3xl -z-20 transform rotate-6 animate-float animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
