import { Doctor, Appointment, TimeSlot, Specialty } from '../types';
import { addDays, format } from 'date-fns';

// Generate available time slots
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const currentDate = new Date();
  
  // Start at 9 AM, end at 5 PM
  for (let hour = 9; hour <= 17; hour++) {
    const isPast = 
      date.getDate() === currentDate.getDate() && 
      date.getMonth() === currentDate.getMonth() && 
      date.getFullYear() === currentDate.getFullYear() && 
      hour < currentDate.getHours();
    
    // 30-minute intervals
    for (let minutes of [0, 30]) {
      // Randomly make some slots unavailable
      const randomlyUnavailable = Math.random() > 0.7;
      
      const time = `${hour === 12 ? 12 : hour % 12}:${minutes === 0 ? '00' : minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
      
      slots.push({
        id: `${hour}-${minutes}`,
        time,
        available: !isPast && !randomlyUnavailable,
      });
    }
  }
  
  return slots;
};

// List of specialties
export const specialties: Specialty[] = [
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Neurology',
  'Obstetrics',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
];

// Days of the week
export const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

// Generate a mock list of doctors
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. John Anderson',
    photo: 'https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Cardiology',
    rating: 4.8,
    numReviews: 124,
    availability: ['Monday', 'Tuesday', 'Thursday'],
    location: 'InVitro Medical Center, New York',
    bio: 'Dr. Anderson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. He specializes in preventive cardiology and heart failure management.',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    photo: 'https://images.pexels.com/photos/7407063/pexels-photo-7407063.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Dermatology',
    rating: 4.9,
    numReviews: 89,
    availability: ['Monday', 'Wednesday', 'Friday'],
    location: 'InVitro Skin Clinic, Boston',
    bio: 'Dr. Chen is a leading dermatologist specializing in skin cancer detection and cosmetic procedures. He has published numerous papers on innovative dermatological treatments.',
  },
  {
    id: '3',
    name: 'Dr. Thomas Martinez',
    photo: 'https://images.pexels.com/photos/8326324/pexels-photo-8326324.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Pediatrics',
    rating: 4.7,
    numReviews: 156,
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    location: 'InVitro Children\'s Center, Chicago',
    bio: 'Dr. Martinez is passionate about children\'s health and development. With over a decade of experience, he provides comprehensive care for children from infancy through adolescence.',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    photo: 'https://images.pexels.com/photos/26886763/pexels-photo-26886763/free-photo-of-portrait-of-a-bearded-man-using-a-stethoscope.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Orthopedics',
    rating: 4.6,
    numReviews: 102,
    availability: ['Monday', 'Thursday', 'Friday'],
    location: 'InVitro Sports Medicine, San Francisco',
    bio: 'Dr. Wilson specializes in sports medicine and joint replacement surgery. He has worked with professional athletes and helps patients of all activity levels recover from injuries.',
  },
  {
    id: '5',
    name: 'Dr. David Park',
    photo: 'https://images.pexels.com/photos/8942072/pexels-photo-8942072.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Psychiatry',
    rating: 4.9,
    numReviews: 78,
    availability: ['Tuesday', 'Wednesday', 'Friday'],
    location: 'InVitro Mental Health Center, Seattle',
    bio: 'Dr. Park focuses on anxiety, depression, and stress management. He takes a holistic approach to mental health, combining medication management with therapeutic techniques.',
  },
  {
    id: '6',
    name: 'Dr. Robert Thompson',
    photo: 'https://images.pexels.com/photos/6303595/pexels-photo-6303595.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Neurology',
    rating: 4.7,
    numReviews: 93,
    availability: ['Monday', 'Wednesday', 'Thursday'],
    location: 'InVitro Neuroscience Center, Houston',
    bio: 'Dr. Thompson is an expert in treating neurological disorders, including migraines, epilepsy, and stroke. He employs the latest diagnostic technologies for accurate assessments.',
  },
  {
    id: '7',
    name: 'Dr. William Harris',
    photo: 'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Family Medicine',
    rating: 4.8,
    numReviews: 145,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    location: 'InVitro Primary Care, Miami',
    bio: 'Dr. Harris provides comprehensive care for patients of all ages. He emphasizes preventive medicine and building long-term relationships with his patients.',
  },
  {
    id: '8',
    name: 'Dr. Alexander Wright',
    photo: 'https://images.pexels.com/photos/6129118/pexels-photo-6129118.jpeg?auto=compress&cs=tinysrgb&w=600',
    specialty: 'Obstetrics',
    rating: 4.9,
    numReviews: 112,
    availability: ['Monday', 'Wednesday', 'Friday'],
    location: 'InVitro Women\'s Health, Denver',
    bio: 'Dr. Wright specializes in prenatal care and childbirth. He is dedicated to providing compassionate support throughout pregnancy and ensuring healthy outcomes for mothers and babies.',
  },
];

// Sample initial appointments
export const initialAppointments: Appointment[] = [
  {
    id: '1001',
    doctorId: '1',
    date: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
    time: '10:00 AM',
    confirmed: true,
  },
  {
    id: '1002',
    doctorId: '5',
    date: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    time: '2:30 PM',
    confirmed: true,
  },
];