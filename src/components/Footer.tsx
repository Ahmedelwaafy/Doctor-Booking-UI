import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation("home");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-sky-400 mr-2" aria-hidden="true" />
              <span className="text-xl font-bold">InVitro Health</span>
            </div>
            <p className="text-slate-300 text-sm">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              {Object.entries(t('footer.quickLinks.items', { returnObjects: true })).map(([key, value]) => (
                <li key={key}>
                  <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-2">
              {Object.entries(t('footer.services.items', { returnObjects: true })).map(([key, value]) => (
                <li key={key}>
                  <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-sky-400 mr-2 mt-0.5" aria-hidden="true" />
                <span className="text-slate-300">{t('footer.contact.address')}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-sky-400 mr-2" aria-hidden="true" />
                <span className="text-slate-300">{t('footer.contact.phone')}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-sky-400 mr-2" aria-hidden="true" />
                <span className="text-slate-300">{t('footer.contact.email')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-400 text-sm">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer