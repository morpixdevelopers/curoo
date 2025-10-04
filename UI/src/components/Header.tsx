import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Heart, ChevronDown, ArrowRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const services = [
    { name: 'Cardiology', description: 'Heart and cardiovascular care', icon: '❤️' },
    { name: 'Pediatrics', description: 'Specialized care for children', icon: '👶' },
    { name: 'Orthopedics', description: 'Bone and joint treatment', icon: '🦴' },
    { name: 'Neurology', description: 'Brain and nervous system', icon: '🧠' },
    { name: 'Emergency Care', description: '24/7 urgent medical care', icon: '🚨' }
  ];

  return (
    <>
      {/* Blur Overlay */}
      {isServicesHovered && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300" />
      )}
      
 

      {/* Main Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-2xl py-2 border-b border-purple-100' : 'bg-white/80 backdrop-blur-md py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Heart className="text-white animate-pulse" size={20} />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">Healing Hands</h1>
                <p className="text-sm text-gray-600 font-medium">Medical Center</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <div
                className="relative"
                onMouseEnter={() => setIsServicesHovered(true)}
              >
                <button
                  onClick={() => scrollToSection('services')}
                  className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium group flex items-center space-x-1"
                >
                  <span>Services</span>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                
                {/* Full-Width Dropdown */}
                {isServicesHovered && (
                  <div 
                    className="fixed left-0 right-0 top-full bg-white shadow-2xl border-t border-purple-100 z-50 animate-slideDown"
                    onMouseEnter={() => setIsServicesHovered(true)}
                    onMouseLeave={() => setIsServicesHovered(false)}
                  >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
                          Our Medical Services
                        </h3>
                        <p className="text-gray-600">Comprehensive healthcare services with expert medical professionals</p>
                      </div>
                      
                      <div className="grid md:grid-cols-5 gap-6">
                        {services.map((service, index) => (
                          <div
                            key={service.name}
                            className="group p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/20"
                            onClick={() => {
                              scrollToSection('services');
                            }}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                              {service.icon}
                            </div>
                            <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:from-purple-700 group-hover:to-pink-600">
                              {service.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                              {service.description}
                            </p>
                            <div className="flex items-center text-purple-600 text-sm font-medium group-hover:text-purple-700 transform group-hover:translate-x-2 transition-all duration-300">
                              <span>Learn More</span>
                              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center mt-8">
                        <button
                          onClick={() => {
                            scrollToSection('services');
                          }}
                          className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-8 py-3 rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 font-medium transform hover:scale-105 group overflow-hidden relative"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative">View All Services</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => scrollToSection('doctors')}
                className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium group"
              >
                Doctors
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="relative text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            </nav>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('appointment')}
              className="hidden md:block relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 font-medium transform hover:scale-105 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Book Appointment</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} className="transform rotate-180 transition-transform duration-300" /> : <Menu size={24} className="transform transition-transform duration-300" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-200 animate-slideDown">
              <nav className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium text-left transform hover:translate-x-2"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium text-left transform hover:translate-x-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium text-left transform hover:translate-x-2"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('doctors')}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium text-left transform hover:translate-x-2"
                >
                  Doctors
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium text-left transform hover:translate-x-2"
                >
                  Contact
                </button>
                <button
                  onClick={() => scrollToSection('appointment')}
                  className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium text-left transform hover:scale-105"
                >
                  Book Appointment
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;