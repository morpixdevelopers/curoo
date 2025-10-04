import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Star, Sparkles, Heart } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="text-purple-500 animate-pulse" size={24} />
            <span className="text-purple-600 font-semibold">Get in Touch</span>
            <Heart className="text-pink-500 animate-pulse" size={24} />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fadeInUp animation-delay-300">
            We're here to help you 24/7. Reach out to us for appointments, emergencies, 
            or any questions about our services. ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 animate-fadeInUp animation-delay-600">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Get in Touch</h3>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <MapPin className="text-purple-600 group-hover:animate-bounce" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">Address</h4>
                  <p className="text-gray-700">
                    123 Medical Center Drive<br />
                    Health City, HC 12345<br />
                    United States
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Phone className="text-green-600 group-hover:animate-bounce" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">Phone Numbers</h4>
                  <p className="text-gray-700">
                    Main: (555) 123-4567<br />
                    Emergency: (555) 911-HELP<br />
                    Appointments: (555) 123-APPT
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Mail className="text-blue-600 group-hover:animate-bounce" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-2">Email</h4>
                  <p className="text-gray-700">
                    General: info@healinghands.com<br />
                    Appointments: appointments@healinghands.com<br />
                    Emergency: emergency@healinghands.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Clock className="text-orange-600 group-hover:animate-bounce" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2">Hours</h4>
                  <p className="text-gray-700">
                    Monday - Friday: 7:00 AM - 8:00 PM<br />
                    Saturday: 8:00 AM - 6:00 PM<br />
                    Sunday: 9:00 AM - 5:00 PM<br />
                    <span className="text-red-600 font-bold animate-pulse">🚨 Emergency: 24/7</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <h4 className="text-red-800 font-bold text-lg mb-2 flex items-center space-x-2">
                <Sparkles className="animate-pulse" size={20} />
                <span>Emergency Care</span>
              </h4>
              <p className="text-red-700 font-medium">
                For life-threatening emergencies, call 911 immediately or visit our Emergency Department. 
                We're available 24/7 for urgent medical care.
              </p>
            </div>

            {/* Directions Button */}
            <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 font-medium flex items-center space-x-2 transform hover:scale-110 group overflow-hidden relative">
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <Navigation className="relative group-hover:animate-bounce" size={20} />
              <span className="relative">Get Directions</span>
            </button>
          </div>

          {/* Map */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-purple-100 rounded-3xl h-[500px] flex items-center justify-center group hover:shadow-2xl transition-all duration-500">
              {/* Placeholder for Google Maps */}
              <div className="text-center">
                <MapPin className="text-purple-400 mx-auto mb-4 group-hover:animate-bounce" size={48} />
                <p className="text-purple-600 text-lg font-semibold">Interactive Map</p>
                <p className="text-purple-500">
                  Google Maps integration would be here
                </p>
              </div>
            </div>
            
            {/* Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-purple-100/50 transform hover:scale-105 transition-all duration-300">
              <h5 className="font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">Healing Hands Medical Center</h5>
              <p className="text-gray-700 text-sm font-medium">123 Medical Center Drive, Health City, HC 12345</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-green-600 text-sm font-bold animate-pulse">● Open Now</span>
                <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transform hover:scale-105 transition-all duration-200">
                  View Larger Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 animate-fadeInUp animation-delay-1000">
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Star className="text-blue-600 group-hover:animate-spin" size={24} />
            </div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-3">Patient Portal</h4>
            <p className="text-gray-700 mb-4">
              Access your medical records, test results, and communicate with your care team.
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-700 transition-all duration-300 transform hover:translate-x-2 flex items-center justify-center space-x-2 mx-auto">
              <Sparkles className="animate-pulse" size={16} />
              <span>Login to Portal</span>
              <span>→</span>
            </button>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Heart className="text-green-600 group-hover:animate-pulse" size={24} />
            </div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-3">Telemedicine</h4>
            <p className="text-gray-700 mb-4">
              Consult with our doctors from the comfort of your home via video call.
            </p>
            <button className="text-green-600 font-medium hover:text-green-700 transition-all duration-300 transform hover:translate-x-2 flex items-center justify-center space-x-2 mx-auto">
              <Sparkles className="animate-pulse" size={16} />
              <span>Schedule Video Visit</span>
              <span>→</span>
            </button>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Sparkles className="text-purple-600 group-hover:animate-spin" size={24} />
            </div>
            <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">Insurance</h4>
            <p className="text-gray-700 mb-4">
              We accept most major insurance plans. Check if your plan is covered.
            </p>
            <button className="text-purple-600 font-medium hover:text-purple-700 transition-all duration-300 transform hover:translate-x-2 flex items-center justify-center space-x-2 mx-auto">
              <Sparkles className="animate-pulse" size={16} />
              <span>Verify Coverage</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;