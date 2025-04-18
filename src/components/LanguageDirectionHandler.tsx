import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDirectionHandler = () => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const lng = i18n.language?.startsWith("ar") ? "ar" : "en";
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = lng;
  }, [i18n, i18n.language]);

  return null;
};

export default LanguageDirectionHandler;