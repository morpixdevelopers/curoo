import React from 'react';
import { useState, useEffect } from 'react';
import { Heart, Baby, Bone, Brain, Zap, ScanLine, Sparkles, Star } from 'lucide-react';
import { services } from '../data/hospitalData';

const iconMap = {
  Heart,
  Baby,
  Bone,
  Brain,
  Zap,
  ScanLine
};

const Services: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="relative py-20 bg-gradient-to-br from-gray-50 via-purple-50/50 to-pink-50/50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="text-purple-500 animate-spin-slow" size={24} />
            <span className="text-purple-600 font-semibold">Our Medical Specialties</span>
            <Star className="text-pink-500 animate-spin-slow" size={24} />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Our Medical Services
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fadeInUp animation-delay-300">
            We offer comprehensive healthcare services across multiple specialties, 
            providing expert care with the latest medical technology and techniques. ✨
          </p>
        </div>

        {/* Services Carousel */}
        <div className="mb-16 animate-fadeInUp animation-delay-600">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100/50 overflow-hidden">
            <div className="relative h-96 overflow-hidden">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <div
                    key={service.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                      index === currentSlide 
                        ? 'translate-x-0 opacity-100' 
                        : index < currentSlide 
                          ? '-translate-x-full opacity-0' 
                          : 'translate-x-full opacity-0'
                    }`}
                  >
                    <div className="flex items-center justify-center h-full p-12">
                      <div className="text-center max-w-2xl">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 rounded-3xl flex items-center justify-center mx-auto mb-8 transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg">
                          <IconComponent className="text-purple-600 animate-pulse" size={40} />
                        </div>
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
                          {service.name}
                        </h3>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                          {service.description}
                        </p>
                        <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 font-medium transform hover:scale-110 group overflow-hidden relative bottom-3">
                          <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                          <span className="relative flex items-center space-x-2">
                            <Sparkles className="group-hover:animate-spin" size={20} />
                            <span>Learn More</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg scale-125 w-10'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <div className="absolute top-6 right-6">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">
                  {currentSlide + 1} / {services.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-fadeInUp animation-delay-1000">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={service.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-100/50 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <IconComponent className="text-purple-600 group-hover:animate-bounce" size={32} />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">{service.name}</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                <button className="group/btn text-purple-600 font-medium hover:text-purple-700 transition-all duration-300 flex items-center space-x-2 transform hover:translate-x-2">
                  <Sparkles className="group-hover/btn:animate-spin" size={16} />
                  <span>Learn More</span>
                  <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            );
          })}
        </div> */}

        {/* Additional Services */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-3xl p-8 lg:p-12 text-white text-center overflow-hidden animate-fadeInUp animation-delay-1200">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="animate-pulse" size={24} />
              <h3 className="text-4xl font-bold">More Services Available</h3>
              <Sparkles className="animate-pulse" size={24} />
            </div>
            <p className="text-xl mb-8 text-white/90">
            We also offer specialized services in Dermatology, Ophthalmology, Oncology, 
            Physical Therapy, Laboratory Services, and more.
          </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2 transform hover:scale-105 transition-all duration-300">
              <h4 className="font-semibold text-lg">Diagnostic Services</h4>
                <ul className="space-y-1 text-white/80">
                <li>• Laboratory Testing</li>
                <li>• Medical Imaging</li>
                <li>• Cardiac Testing</li>
              </ul>
            </div>
              <div className="space-y-2 transform hover:scale-105 transition-all duration-300">
              <h4 className="font-semibold text-lg">Surgical Services</h4>
                <ul className="space-y-1 text-white/80">
                <li>• Minimally Invasive Surgery</li>
                <li>• Outpatient Procedures</li>
                <li>• Robotic Surgery</li>
              </ul>
            </div>
              <div className="space-y-2 transform hover:scale-105 transition-all duration-300">
              <h4 className="font-semibold text-lg">Wellness Programs</h4>
                <ul className="space-y-1 text-white/80">
                <li>• Preventive Care</li>
                <li>• Health Screenings</li>
                <li>• Nutrition Counseling</li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;