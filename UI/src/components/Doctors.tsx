import React from 'react';
import { Award, Clock, Star, Sparkles } from 'lucide-react';
import { doctors } from '../data/hospitalData';

const Doctors: React.FC = () => {
  return (
    <section id="doctors" className="relative py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="text-purple-500 animate-spin-slow" size={24} />
            <span className="text-purple-600 font-semibold">Our Medical Team</span>
            <Star className="text-pink-500 animate-spin-slow" size={24} />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Meet Our Expert Doctors
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fadeInUp animation-delay-300">
            Our team of board-certified physicians brings decades of combined experience 
            and expertise to provide you with the highest quality medical care. ✨
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeInUp animation-delay-600">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden border border-purple-100/50 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                  {doctor.specialty}
                </div>
              </div>
              
              <div className="p-6 relative">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">{doctor.name}</h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="text-purple-600 group-hover:animate-bounce" size={16} />
                  <span className="text-gray-700 text-sm font-medium">{doctor.qualification}</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="text-green-600 group-hover:animate-bounce" size={16} />
                  <span className="text-gray-700 text-sm font-medium">{doctor.experience}</span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 font-medium transform hover:scale-105 group/btn">
                  <Sparkles className="inline mr-2 group-hover/btn:animate-spin" size={16} />
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fadeInUp animation-delay-1000">
          <div className="relative bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-8 lg:p-12 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="text-purple-500 animate-pulse" size={24} />
                <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Need to See a Specialist?
                </h3>
                <Sparkles className="text-pink-500 animate-pulse" size={24} />
              </div>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Our doctors are here to help you. Schedule a consultation today and take 
                the first step towards better health. ✨
            </p>
            <button
              onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-10 py-4 rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 font-medium transform hover:scale-110 group/btn overflow-hidden relative"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                <span className="relative flex items-center space-x-2">
                  <Sparkles className="group-hover/btn:animate-spin" size={20} />
                  <span>Schedule Consultation</span>
                </span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;