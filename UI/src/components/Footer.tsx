import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 relative z-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <Heart className="text-white animate-pulse" size={20} />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-full animate-ping opacity-20"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-red-300 bg-clip-text text-transparent">Healing Hands</h3>
                <p className="text-gray-300 text-sm font-medium">Medical Center</p>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Providing exceptional, compassionate healthcare services to our community 
              for over 25 years. Your health is our priority. ✨
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
                aria-label="Facebook"
              >
                <Facebook size={20} className="hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-300 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
                aria-label="Twitter"
              >
                <Twitter size={20} className="hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-br hover:from-pink-600 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
                aria-label="Instagram"
              >
                <Instagram size={20} className="hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="hover:animate-bounce" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
              <Sparkles className="text-purple-400 animate-pulse" size={16} />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-purple-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-purple-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-purple-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('doctors')}
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-purple-300"
                >
                  Our Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('appointment')}
                  className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-purple-300"
                >
                  Book Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
              <Sparkles className="text-green-400 animate-pulse" size={16} />
              <span>Our Services</span>
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-green-300">
                  Cardiology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-green-300">
                  Pediatrics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-green-300">
                  Orthopedics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-green-300">
                  Neurology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:text-green-300">
                  Emergency Care
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
              <Sparkles className="text-blue-400 animate-pulse" size={16} />
              <span>Contact Info</span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="text-purple-400 mt-1 group-hover:animate-bounce" size={18} />
                <div className="text-gray-200">
                  <p>123 Medical Center Drive</p>
                  <p>Health City, HC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="text-green-400 group-hover:animate-bounce" size={18} />
                <div className="text-gray-200">
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="text-blue-400 group-hover:animate-bounce" size={18} />
                <div className="text-gray-200">
                  <p>info@healinghands.com</p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="mt-6 p-4 bg-gradient-to-r from-red-900/40 to-pink-900/40 border-2 border-red-700/50 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <p className="text-red-300 text-sm font-bold flex items-center space-x-2">
                <Sparkles className="animate-pulse" size={16} />
                <span>Emergency: Call 911 or (555) 911-HELP</span>
              </p>
              <p className="text-red-400 text-xs mt-1 animate-pulse">
                🚨 24/7 Emergency Care Available
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center relative z-10">
          <p className="text-gray-300 text-sm">
            © 2024 Healing Hands Medical Center. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 transform hover:translate-y-1 hover:text-purple-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 transform hover:translate-y-1 hover:text-purple-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 transform hover:translate-y-1 hover:text-purple-300">
              HIPAA Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;