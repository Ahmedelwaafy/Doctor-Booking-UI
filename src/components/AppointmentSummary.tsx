import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, MapPin, UserCheck, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const AppointmentSummary: React.FC = () => {
  const { t } = useTranslation(["home", "common"]);
  const { state, dispatch } = useAppContext();
  const { appointments, doctors } = state;
  
  if (appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="p-8 text-center" data-testid="no-appointments">
          <CardContent className="pt-6">
            <Calendar className="h-16 w-16 text-neutral-400 mx-auto mb-2" aria-hidden="true" />
            <h3 className="text-xl font-medium mb-2 ">{t('appointments.empty.title')}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {t('appointments.empty.message')}
            </p>
            <Button
              onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'doctors' })}
              aria-label="Browse doctors"
            >
              {t('appointments.empty.action')}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
  
  const findDoctor = (doctorId: string) => {
    return doctors.find((doctor) => doctor.id === doctorId);
  };
  
  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm(t('common:notifications.confirmCancel'))) {
      dispatch({ type: 'CANCEL_APPOINTMENT', payload: appointmentId });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="appointment-summary"
    >
      <h2 className="text-2xl font-semibold mb-4 rtl:text-right">{t('appointments.title')}</h2>
      
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appointment) => {
            const doctor = findDoctor(appointment.doctorId);
            if (!doctor) return null;
            
            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.2 }
                }}
                layout
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/4 mb-4 sm:mb-0">
                        <img 
                          src={doctor.photo} 
                          alt={doctor.name} 
                          className="w-full h-32 sm:h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="sm:w-3/4">
                        <div className="flex flex-col sm:flex-row justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <span className="badge bg-primary/10 text-primary mb-2">
                              {doctor.specialty}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-destructive hover:text-destructive/90 flex items-center sm:justify-start justify-end mt-2 sm:mt-0"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            aria-label={`Cancel appointment with ${doctor.name}`}
                          >
                            <X className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" aria-hidden="true" />
                            <span className="text-sm">{t('appointments.cancel')}</span>
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                          <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                            <Calendar className="h-4 w-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
                            <span className="text-sm">
                              {format(parseISO(appointment.date), 'EEEE, MMMM d, yyyy')}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                            <Clock className="h-4 w-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                          
                          <div className="flex items-center text-neutral-700 dark:text-neutral-300">
                            <MapPin className="h-4 w-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
                            <span className="text-sm">{doctor.location}</span>
                          </div>
                          
                          <div className="flex items-center text-success-600">
                            <UserCheck className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
                            <span className="text-sm font-medium">{t('appointments.confirmed')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default AppointmentSummary;