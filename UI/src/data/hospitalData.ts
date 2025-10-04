import { Doctor, Service } from '../types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    qualification: 'MD, FACC',
    experience: '15+ years',
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    qualification: 'MD, FAAP',
    experience: '12+ years',
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Orthopedics',
    qualification: 'MD, FAAOS',
    experience: '18+ years',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    qualification: 'MD, PhD',
    experience: '20+ years',
    image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Cardiology',
    description: 'Comprehensive heart care including diagnostics, treatment, and prevention of cardiovascular diseases.',
    icon: 'Heart'
  },
  {
    id: '2',
    name: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents with compassionate family-centered approach.',
    icon: 'Baby'
  },
  {
    id: '3',
    name: 'Orthopedics',
    description: 'Advanced treatment for bone, joint, muscle, and ligament conditions using latest surgical techniques.',
    icon: 'Bone'
  },
  {
    id: '4',
    name: 'Neurology',
    description: 'Expert diagnosis and treatment of nervous system disorders including brain, spine, and nerve conditions.',
    icon: 'Brain'
  },
  {
    id: '5',
    name: 'Emergency Care',
    description: '24/7 emergency medical services with rapid response team and state-of-the-art trauma center.',
    icon: 'Zap'
  },
  {
    id: '6',
    name: 'Radiology',
    description: 'Advanced medical imaging services including MRI, CT scans, X-rays, and ultrasound diagnostics.',
    icon: 'ScanLine'
  }
];