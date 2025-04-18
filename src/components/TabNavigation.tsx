import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, CalendarCheck } from 'lucide-react';
import { clsx } from 'clsx';

const TabNavigation: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  const handleTabChange = (tab: 'doctors' | 'appointments') => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };
  
  const tabs = [
    {
      id: 'doctors',
      label: 'Find Doctors',
      icon: <Users className="h-5 w-5 mr-2" aria-hidden="true" />,
      count: state.doctors.length,
    },
    {
      id: 'appointments',
      label: 'My Appointments',
      icon: <CalendarCheck className="h-5 w-5 mr-2" aria-hidden="true" />,
      count: state.appointments.length,
    },
  ];
  
  return (
    <div className="bg-white shadow-sm rounded-lg mb-6" role="tablist">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx(
              'flex-1 py-4 px-4 flex items-center justify-center transition-colors duration-200 font-medium',
              {
                'text-primary-600 border-b-2 border-primary-500': state.activeTab === tab.id,
                'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50': state.activeTab !== tab.id,
              }
            )}
            onClick={() => handleTabChange(tab.id as 'doctors' | 'appointments')}
            role="tab"
            aria-selected={state.activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.id === 'appointments' && tab.count > 0 && (
              <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;