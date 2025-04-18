import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
      <SelectTrigger className="w-[140px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;