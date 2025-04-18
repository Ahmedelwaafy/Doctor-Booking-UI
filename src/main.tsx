import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './components/ThemeProvider';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ErrorBoundaryFallback from './components/ErrorBoundaryFallback';

function LoadingFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <AppProvider>
                  <App />
                  <Toaster position="top-right" expand={true} richColors />
                </AppProvider>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>
      </I18nextProvider>
    </HelmetProvider>
  </StrictMode>
);