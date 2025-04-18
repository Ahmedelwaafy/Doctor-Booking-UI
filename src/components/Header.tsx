import React from 'react';
import { Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { t } = useTranslation("home");

  return (
    <header className="bg-background border-b py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-primary mr-2" aria-hidden="true" />
          <span className="text-2xl font-bold text-primary">InVitro Health</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary font-medium">{t('header.home')}</a>
          <a href="#" className="text-foreground hover:text-primary font-medium">{t('header.doctors')}</a>
          <a href="#" className="text-foreground hover:text-primary font-medium">{t('header.services')}</a>
          <a href="#" className="text-foreground hover:text-primary font-medium">{t('header.about')}</a>
          <a href="#" className="text-foreground hover:text-primary font-medium">{t('header.contact')}</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button>
            {t('header.signIn')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header