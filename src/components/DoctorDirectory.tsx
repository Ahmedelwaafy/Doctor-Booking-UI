import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DoctorCard from './DoctorCard';
import { FilterIcon, X, LayoutGrid, LayoutList } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { specialties, daysOfWeek } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import type { Specialty, CardLayout } from '../types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const DoctorDirectory: React.FC = () => {
  const { t, i18n } = useTranslation("home");
  const { state, dispatch } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const isRTL = i18n.dir() === 'rtl';
  
  const [filteredSpecialty, setFilteredSpecialty] = useState<Specialty | 'All'>(
    (searchParams.get('specialty') as Specialty | 'All') || 'All'
  );
  const [filteredAvailability, setFilteredAvailability] = useState<string>(
    searchParams.get('availability') || 'All'
  );
  
  const handleSpecialtyChange = (value: string) => {
    setFilteredSpecialty(value as Specialty | 'All');
    if (value === 'All') {
      searchParams.delete('specialty');
    } else {
      searchParams.set('specialty', value);
    }
    setSearchParams(searchParams);
  };

  const handleAvailabilityChange = (value: string) => {
    setFilteredAvailability(value);
    if (value === 'All') {
      searchParams.delete('availability');
    } else {
      searchParams.set('availability', value);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setFilteredSpecialty('All');
    setFilteredAvailability('All');
    setSearchParams({});
  };

  const toggleLayout = (layout: CardLayout) => {
    dispatch({ type: 'SET_CARD_LAYOUT', payload: layout });
  };
  
  const filteredDoctors = useMemo(() => {
    return state.doctors.filter((doctor) => {
      const matchesSpecialty = 
        filteredSpecialty === 'All' || 
        doctor.specialty === filteredSpecialty;
      
      const matchesAvailability = 
        filteredAvailability === 'All' || 
        doctor.availability.includes(filteredAvailability);
      
      return matchesSpecialty && matchesAvailability;
    });
  }, [state.doctors, filteredSpecialty, filteredAvailability]);

  const hasActiveFilters = filteredSpecialty !== 'All' || filteredAvailability !== 'All';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="animate-fade-in"
      data-testid="doctor-directory"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 rtl:text-right">{t('doctorDirectory.title')}</h2>
        
        <div className="bg-card rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4 rtl:flex-row-reverse">
            <div className="flex items-center gap-2">
              <FilterIcon className="h-5 w-5 text-primary " aria-hidden="true" />
              <h3 className="text-lg font-medium">{t('doctorDirectory.filters.title')}</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="border rounded-md p-1 flex">
                <Button
                  variant={state.cardLayout === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => toggleLayout('grid')}
                  className="h-8 w-8"
                  aria-label="Grid layout"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={state.cardLayout === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => toggleLayout('list')}
                  className="h-8 w-8"
                  aria-label="List layout"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {t('doctorDirectory.filters.clearFilters')}
                </Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rtl:rtl">
            <div className="space-y-2">
              <label htmlFor="specialty-filter" className="form-label">
                {t('doctorDirectory.filters.specialty')}
              </label>
              <Select
                value={filteredSpecialty}
                onValueChange={handleSpecialtyChange}
              >
                <SelectTrigger className="text-start">
                  <SelectValue placeholder={t('doctorDirectory.filters.specialty')} />
                </SelectTrigger>
                <SelectContent align={isRTL ? 'end' : 'start'}>
                  <SelectItem value="All">{t('doctorDirectory.filters.allSpecialties')}</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="availability-filter" className="form-label">
                {t('doctorDirectory.filters.availability')}
              </label>
              <Select
                value={filteredAvailability}
                onValueChange={handleAvailabilityChange}
              >
                <SelectTrigger className="text-start">
                  <SelectValue placeholder={t('doctorDirectory.filters.availability')} />
                </SelectTrigger>
                <SelectContent align={isRTL ? 'end' : 'start'}>
                  <SelectItem value="All">{t('doctorDirectory.filters.anyDay')}</SelectItem>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day}>
                      {t(`days.${day.toLowerCase()}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="mb-4 flex justify-start rtl:justify-end items-center">
          <p className="text-muted-foreground ">
            {t('doctorDirectory.results.doctorsFound', { 
      count: filteredDoctors.length,
                                                        context:filteredDoctors.length===1?"one":"other" })}
          </p>
        </div>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`grid gap-6 ${
          state.cardLayout === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              variants={item}
              custom={index}
            >
              <DoctorCard doctor={doctor} layout={state.cardLayout} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full bg-card rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">{t('doctorDirectory.noResults.message')}</p>
            <Button
              onClick={clearFilters}
              variant="secondary"
            >
              {t('doctorDirectory.noResults.action')}
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DoctorDirectory;