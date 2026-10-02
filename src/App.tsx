import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { GoldLoanModal } from './components/GoldLoanModal';
import { GeneralLoanModal } from './components/GeneralLoanModal';
import { PropertyEnquiryModal } from './components/PropertyEnquiryModal';
import { LibraryAdmissionModal } from './components/LibraryAdmissionModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LoansPage } from './pages/LoansPage';
import { OtherServicesPage } from './pages/OtherServicesPage';
import { PropertyPage } from './pages/PropertyPage';
import { RentalPage } from './pages/RentalPage';
import { LibraryPage } from './pages/LibraryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

import { PropertyListingItem } from './services/db';
import { useSEO } from './hooks/useSEO';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('home');

  // Dynamic per-page SEO meta tag updates
  useSEO(currentPath);

  // Modals state
  const [goldLoanModalOpen, setGoldLoanModalOpen] = useState(false);
  const [generalLoanModalOpen, setGeneralLoanModalOpen] = useState(false);
  const [defaultLoanType, setDefaultLoanType] = useState('Business Loan');

  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListingItem | null>(null);
  const [propertyModalMode, setPropertyModalMode] = useState<'enquire' | 'list'>('enquire');

  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const [selectedLibraryWing, setSelectedLibraryWing] = useState<
    'Saraswati Girls Library' | 'Mahadev Boys Library'
  >('Saraswati Girls Library');

  // Initialize hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').trim();
      if (hash) {
        setCurrentPath(hash);
      } else {
        setCurrentPath('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    let cleanPath = path;
    if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
    if (!cleanPath) cleanPath = 'home';

    window.location.hash = `/${cleanPath}`;
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGeneralLoan = (loanType?: string) => {
    if (loanType) setDefaultLoanType(loanType);
    setGeneralLoanModalOpen(true);
  };

  const handleOpenPropertyModal = (property?: PropertyListingItem, mode: 'enquire' | 'list' = 'enquire') => {
    setSelectedProperty(property || null);
    setPropertyModalMode(mode);
    setPropertyModalOpen(true);
  };

  const handleOpenLibraryModal = (wing?: 'Saraswati Girls Library' | 'Mahadev Boys Library') => {
    if (wing) setSelectedLibraryWing(wing);
    setLibraryModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case 'loans':
      case 'loan-services':
      case 'loan-details':
        return (
          <LoansPage
            onOpenGoldLoanModal={() => setGoldLoanModalOpen(true)}
            onOpenGeneralLoanModal={handleOpenGeneralLoan}
          />
        );

      case 'property':
      case 'property-services':
        return (
          <PropertyPage
            onOpenPropertyModal={handleOpenPropertyModal}
            onNavigate={navigateTo}
          />
        );

      case 'rental':
      case 'rental-services':
        return <RentalPage onOpenPropertyModal={handleOpenPropertyModal} />;

      case 'library':
      case 'library-services':
        return <LibraryPage onOpenLibraryModal={handleOpenLibraryModal} />;

      case 'other-services':
        return (
          <OtherServicesPage
            onOpenGeneralLoanModal={handleOpenGeneralLoan}
            onOpenGoldLoanModal={() => setGoldLoanModalOpen(true)}
            onOpenPropertyModal={() => handleOpenPropertyModal()}
          />
        );

      case 'about':
      case 'about-us':
        return <AboutPage />;

      case 'contact':
      case 'contact-us':
        return <ContactPage />;

      case 'admin':
      case 'admin-panel':
        return <AdminPage />;

      case 'home':
      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenGoldLoanModal={() => setGoldLoanModalOpen(true)}
            onOpenGeneralLoanModal={() => handleOpenGeneralLoan()}
            onOpenPropertyModal={handleOpenPropertyModal}
            onOpenLibraryModal={handleOpenLibraryModal}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#024089] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenGoldLoanModal={() => setGoldLoanModalOpen(true)}
        onOpenGeneralLoanModal={() => handleOpenGeneralLoan()}
      />

      {/* Main Viewport */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Action Buttons (WhatsApp, Call, Quick Apply) */}
      <FloatingActions
        onOpenGoldLoanModal={() => setGoldLoanModalOpen(true)}
        onOpenGeneralLoanModal={() => handleOpenGeneralLoan()}
      />

      {/* Global Interactive Modals */}
      <GoldLoanModal
        isOpen={goldLoanModalOpen}
        onClose={() => setGoldLoanModalOpen(false)}
      />

      <GeneralLoanModal
        isOpen={generalLoanModalOpen}
        onClose={() => setGeneralLoanModalOpen(false)}
        defaultLoanType={defaultLoanType}
      />

      <PropertyEnquiryModal
        isOpen={propertyModalOpen}
        onClose={() => setPropertyModalOpen(false)}
        property={selectedProperty}
        mode={propertyModalMode}
      />

      <LibraryAdmissionModal
        isOpen={libraryModalOpen}
        onClose={() => setLibraryModalOpen(false)}
        defaultWing={selectedLibraryWing}
      />
    </div>
  );
}
