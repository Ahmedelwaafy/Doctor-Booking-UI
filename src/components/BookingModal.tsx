import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { format, addDays } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from './ui/dialog';
import { Button } from './ui/button';

const BookingModal: React.FC = () => {
  const { t } = useTranslation("home");
  const { state, dispatch } = useAppContext();
  const { selectedDoctor, isBookingModalOpen, selectedDate, selectedTimeSlot, timeSlots } = state;
  
  if (!isBookingModalOpen || !selectedDoctor) return null;
  
  const nextDates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  const handleSelectDate = (date: Date) => {
    dispatch({ type: 'SELECT_DATE', payload: date });
  };
  
  const handleSelectTimeSlot = (timeSlot: typeof timeSlots[0]) => {
    if (!timeSlot.available) return;
    dispatch({ type: 'SELECT_TIME_SLOT', payload: timeSlot });
  };
  
  const handleBookAppointment = () => {
    dispatch({ type: 'BOOK_APPOINTMENT' });
  };
  
  const isBookingEnabled = selectedTimeSlot !== null;
  
  return (
    <Dialog open={isBookingModalOpen} onOpenChange={() => dispatch({ type: 'CLEAR_SELECTED_DOCTOR' })}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('bookingModal.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center pb-6 border-b">
          <img
            src={selectedDoctor.photo}
            alt={selectedDoctor.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge bg-primary/10 text-primary">
                {selectedDoctor.specialty}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{selectedDoctor.location}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
              <h4 className="font-medium">{t('bookingModal.selectDate')}</h4>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {nextDates.map((date) => {
                const isSelected = 
                  date.getDate() === selectedDate.getDate() && 
                  date.getMonth() === selectedDate.getMonth();
                
                return (
                  <Button
                    key={date.toISOString()}
                    variant={isSelected ? "default" : "outline"}
                    className="h-auto p-2 flex flex-col"
                    onClick={() => handleSelectDate(date)}
                    aria-selected={isSelected}
                    aria-label={`Select date: ${format(date, 'EEEE, MMMM d')}`}
                  >
                    <div className="text-xs font-medium">
                      {format(date, 'EEE')}
                    </div>
                    <div className="font-semibold text-sm mt-1">
                      {format(date, 'd')}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-primary mr-2" aria-hidden="true" />
              <h4 className="font-medium">
                {t('bookingModal.selectTime')} - {format(selectedDate, 'EEEE, MMMM d')}
              </h4>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot?.id === slot.id;
                
                return (
                  <Button
                    key={slot.id}
                    variant={isSelected ? "default" : slot.available ? "outline" : "ghost"}
                    className={`time-slot ${
                      !slot.available ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleSelectTimeSlot(slot)}
                    disabled={!slot.available}
                    aria-selected={isSelected}
                    aria-disabled={!slot.available}
                    aria-label={`Select time: ${slot.time}${!slot.available ? ' - Unavailable' : ''}`}
                  >
                    {slot.time}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">{t('bookingModal.cancel')}</Button>
          </DialogClose>
          <Button
            onClick={handleBookAppointment}
            disabled={!isBookingEnabled}
          >
            {t('bookingModal.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;