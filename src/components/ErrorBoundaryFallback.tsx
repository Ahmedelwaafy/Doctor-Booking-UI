import { FallbackProps } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import HelmetTags from "./HelmetTags";
import { AlertTriangle } from "lucide-react";

export default function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4">
      <HelmetTags
        title={`${t('error.title')} | InVitro Health`}
        description={t('error.somethingWentWrong')}
        index={false}
      />
      
      <div className="max-w-2xl w-full text-center">
        <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-destructive" />
        <h1 className="text-4xl font-bold mb-4">{t('error.somethingWentWrong')}</h1>
        <p className="text-lg text-muted-foreground mb-2">{t('error.apologies')}</p>
        <p className="text-sm text-destructive mb-6">{error.message}</p>
        
        <Button 
          onClick={resetErrorBoundary}
          size="lg"
        >
          {t('error.tryAgain')}
        </Button>
      </div>
    </section>
  );
}