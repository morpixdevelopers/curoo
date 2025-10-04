import React from 'react';
import { Heart, Target, Users, Award, Sparkles, Star } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and dignity, understanding that healing involves both physical and emotional well-being.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in medical care, continuously improving our services through innovation and best practices.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Our multidisciplinary team works together to provide comprehensive, coordinated care tailored to each patient\'s unique needs.'
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards, being honest, transparent, and accountable in all our interactions.'
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="text-purple-500 animate-spin-slow" size={24} />
            <span className="text-purple-600 font-semibold">About Our Medical Center</span>
            <Star className="text-pink-500 animate-spin-slow" size={24} />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Healing Hands Medical Center
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fadeInUp animation-delay-300">
            For over 25 years, we've been dedicated to providing exceptional healthcare services 
            to our community with a commitment to healing, innovation, and compassionate care. ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 animate-fadeInUp animation-delay-600">
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Our Story</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Founded in 1998, Healing Hands Medical Center began as a small community clinic 
              with a simple mission: to provide world-class healthcare that's accessible, 
              affordable, and delivered with genuine compassion.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we've grown into a comprehensive medical facility serving thousands of 
              patients annually. Our state-of-the-art equipment, combined with our team of 
              board-certified physicians and dedicated staff, ensures that every patient 
              receives the highest quality care possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl flex-1 transform hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">50,000+</div>
                <div className="text-gray-700">Patients Served</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl flex-1 transform hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">15</div>
                <div className="text-gray-700">Specialties</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative group">
            <img
              src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern hospital interior"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover transform group-hover:scale-105 transition-all duration-700 hover:shadow-purple-500/25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-3xl"></div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="text-purple-500 animate-pulse" size={20} />
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Our Mission</h3>
            <Sparkles className="text-pink-500 animate-pulse" size={20} />
          </div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            To provide exceptional, compassionate healthcare services that improve the health 
            and well-being of our community while advancing medical knowledge through innovation, 
            education, and research.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeInUp animation-delay-1000">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group border border-purple-100/50"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <IconComponent className="text-purple-600 group-hover:animate-bounce" size={32} />
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">{value.title}</h4>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;