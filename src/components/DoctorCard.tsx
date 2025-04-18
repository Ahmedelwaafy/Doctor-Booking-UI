import React from 'react';
import { Doctor, CardLayout } from '../types';
import { Star, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';

interface DoctorCardProps {
  doctor: Doctor;
  layout: CardLayout;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, layout }) => {
  const { t } = useTranslation("home");
  const { dispatch } = useAppContext();

  const handleBookAppointment = () => {
    dispatch({ type: 'SELECT_DOCTOR', payload: doctor });
  };

  if (layout === 'list') {
    return (
      <Card className="animate-fade-in" data-testid="doctor-card">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4">
            <img 
              src={doctor.photo} 
              alt={`Dr. ${doctor.name}`} 
              className="w-full h-48 md:h-full object-cover object-top rounded-t-lg md:rounded-l-lg md:rounded-t-none "
              loading="lazy"
            />
          </div>
          <div className="md:w-3/4">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{doctor.name}</h3>
                  <span className="badge bg-primary/10 text-primary">
                    {doctor.specialty}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-warning-500 mr-1" aria-hidden="true" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-neutral-500 text-sm ml-1">({doctor.numReviews})</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground text-sm mb-3">{doctor.bio}</p>
              
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" aria-hidden="true" />
                <span className="text-muted-foreground text-sm">{doctor.location}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <Calendar className="h-4 w-4 text-muted-foreground mr-2" aria-hidden="true" />
                <div className="flex flex-wrap gap-1">
                  {doctor.availability.map((day) => (
                    <span 
                      key={day} 
                      className="badge badge-neutral text-xs"
                      aria-label={`Available on ${day}`}
                    >
                      {day.substring(0, 3)}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full sm:w-auto"
                onClick={handleBookAppointment}
                aria-label={`Book appointment with ${doctor.name}`}
              >
                {t('doctorDirectory.bookAppointment')}
              </Button>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in h-full flex flex-col" data-testid="doctor-card">
      <div className="relative pb-[60%] md:pb-[70%]">
        <img 
          src={doctor.photo} 
          alt={`Dr. ${doctor.name}`} 
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">{doctor.name}</h3>
              <span className="badge bg-primary/10 text-primary">
                {doctor.specialty}
              </span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-warning-500 mr-1" aria-hidden="true" />
              <span className="font-medium">{doctor.rating}</span>
              <span className="text-neutral-500 text-sm ml-1">({doctor.numReviews})</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col flex-grow">
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{doctor.bio}</p>
          
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2" aria-hidden="true" />
            <span className="text-muted-foreground text-sm">{doctor.location}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <Calendar className="h-4 w-4 text-muted-foreground mr-2" aria-hidden="true" />
            <div className="flex flex-wrap gap-1">
              {doctor.availability.map((day) => (
                <span 
                  key={day} 
                  className="badge badge-neutral text-xs"
                  aria-label={`Available on ${day}`}
                >
                  {day.substring(0, 3)}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-auto">
            <Button 
              className="w-full"
              onClick={handleBookAppointment}
              aria-label={`Book appointment with ${doctor.name}`}
            >
              {t('doctorDirectory.bookAppointment')}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default DoctorCard;