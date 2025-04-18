import React, { createContext, useContext, useReducer } from 'react';
import { AppState, AppAction, Doctor, TimeSlot, Appointment, CardLayout } from '../types';
import { doctors, initialAppointments, generateTimeSlots } from '../data/mockData';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const initialState: AppState = {
  doctors,
  appointments: initialAppointments,
  selectedDoctor: null,
  selectedDate: new Date(),
  selectedTimeSlot: null,
  isBookingModalOpen: false,
  filteredSpecialty: 'All',
  filteredAvailability: 'All',
  activeTab: 'doctors',
  timeSlots: generateTimeSlots(new Date()),
  cardLayout: 'grid',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_FILTERED_SPECIALTY':
      return {
        ...state,
        filteredSpecialty: action.payload,
      };
    case 'SET_FILTERED_AVAILABILITY':
      return {
        ...state,
        filteredAvailability: action.payload,
      };
    case 'SELECT_DOCTOR':
      return {
        ...state,
        selectedDoctor: action.payload,
        isBookingModalOpen: true,
        selectedTimeSlot: null,
        timeSlots: generateTimeSlots(state.selectedDate),
      };
    case 'CLEAR_SELECTED_DOCTOR':
      return {
        ...state,
        selectedDoctor: null,
        isBookingModalOpen: false,
        selectedTimeSlot: null,
      };
    case 'SET_BOOKING_MODAL_OPEN':
      return {
        ...state,
        isBookingModalOpen: action.payload,
      };
    case 'SELECT_DATE':
      return {
        ...state,
        selectedDate: action.payload,
        selectedTimeSlot: null,
        timeSlots: generateTimeSlots(action.payload),
      };
    case 'SELECT_TIME_SLOT':
      return {
        ...state,
        selectedTimeSlot: action.payload,
      };
    case 'BOOK_APPOINTMENT':
      if (state.selectedDoctor && state.selectedTimeSlot) {
        const newAppointment: Appointment = {
          id: `appt-${Date.now()}`,
          doctorId: state.selectedDoctor.id,
          date: format(state.selectedDate, 'yyyy-MM-dd'),
          time: state.selectedTimeSlot.time,
          confirmed: true,
        };
        
        return {
          ...state,
          appointments: [...state.appointments, newAppointment],
          isBookingModalOpen: false,
          selectedDoctor: null,
          selectedTimeSlot: null,
          activeTab: 'appointments',
        };
      }
      return state;
    case 'CANCEL_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment.id !== action.payload
        ),
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };
    case 'SET_CARD_LAYOUT':
      return {
        ...state,
        cardLayout: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { t } = useTranslation("home");

  const wrappedDispatch = (action: AppAction) => {
    dispatch(action);
    
    // Show notifications for specific actions
    switch (action.type) {
      case 'BOOK_APPOINTMENT':
        toast.success(t('notifications.appointmentBooked'));
        break;
      case 'CANCEL_APPOINTMENT':
        toast.success(t('notifications.appointmentCanceled'));
        break;
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch: wrappedDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);