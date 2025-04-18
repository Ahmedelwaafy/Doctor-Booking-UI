import React, { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DoctorDirectory from './components/DoctorDirectory';
import BookingModal from './components/BookingModal';
import AppointmentSummary from './components/AppointmentSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import LanguageDirectionHandler from './components/LanguageDirectionHandler';
import HelmetTags from './components/HelmetTags';
import { useTranslation } from 'react-i18next';

function App() {
  const { state, dispatch } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("home");
  
  // Sync URL params with state
  useEffect(() => {
    const specialty = searchParams.get("specialty") || "All";
    const availability = searchParams.get("availability") || "All";

    dispatch({ type: "SET_FILTERED_SPECIALTY", payload: specialty as any });
    dispatch({ type: "SET_FILTERED_AVAILABILITY", payload: availability });
  }, []);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.filteredSpecialty !== "All")
      params.set("specialty", state.filteredSpecialty);
    if (state.filteredAvailability !== "All")
      params.set("availability", state.filteredAvailability);
    setSearchParams(params);
  }, [state.filteredSpecialty, state.filteredAvailability]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <HelmetTags
        title={state.activeTab === 'doctors' ? t('doctorDirectory.title') : t('appointments.title')}
        description={t('meta.description')}
        canonical={state.activeTab}
      />
      <LanguageDirectionHandler />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={state.activeTab} onValueChange={(value) => dispatch({ type: 'SET_ACTIVE_TAB', payload: value as 'doctors' | 'appointments' })}>
            <TabsList className="grid w-full grid-cols-2 mb-6 rtl:rtl">
              <TabsTrigger value="doctors">{t('doctorDirectory.title')}</TabsTrigger>
              <TabsTrigger value="appointments">
                {t('appointments.title')}
                {state.appointments.length > 0 && (
                  <span className="mx-2 bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {state.appointments.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="doctors">
              <DoctorDirectory />
            </TabsContent>
            
            <TabsContent value="appointments">
              <AppointmentSummary />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <BookingModal />
      <Footer />
    </div>
  );
}

export default App;