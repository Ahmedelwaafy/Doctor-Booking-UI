import React from 'react';

export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialty: Specialty;
  rating: number;
  numReviews: number;
  availability: string[]; // e.g., "Monday", "Thursday"
  location: string;
  bio: string;
}

export type Specialty = 
  | 'Cardiology' 
  | 'Dermatology' 
  | 'Family Medicine' 
  | 'Neurology' 
  | 'Obstetrics'
  | 'Oncology'
  | 'Ophthalmology'
  | 'Orthopedics'
  | 'Pediatrics' 
  | 'Psychiatry';

export interface TimeSlot {
  id: string;
  time: string; // e.g., "9:00 AM"
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  date: string; // ISO date string
  time: string;
  confirmed: boolean;
}

export type CardLayout = 'grid' | 'list';

export interface AppState {
  doctors: Doctor[];
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  selectedDate: Date;
  selectedTimeSlot: TimeSlot | null;
  isBookingModalOpen: boolean;
  filteredSpecialty: Specialty | 'All';
  filteredAvailability: string | 'All';
  activeTab: 'doctors' | 'appointments';
  timeSlots: TimeSlot[];
  cardLayout: CardLayout;
}

export type AppAction =
  | { type: 'SET_FILTERED_SPECIALTY'; payload: Specialty | 'All' }
  | { type: 'SET_FILTERED_AVAILABILITY'; payload: string | 'All' }
  | { type: 'SELECT_DOCTOR'; payload: Doctor }
  | { type: 'CLEAR_SELECTED_DOCTOR' }
  | { type: 'SET_BOOKING_MODAL_OPEN'; payload: boolean }
  | { type: 'SELECT_DATE'; payload: Date }
  | { type: 'SELECT_TIME_SLOT'; payload: TimeSlot }
  | { type: 'BOOK_APPOINTMENT' }
  | { type: 'CANCEL_APPOINTMENT'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: 'doctors' | 'appointments' }
  | { type: 'SET_CARD_LAYOUT'; payload: CardLayout };