import React, { useState } from 'react';
import { Phone, Menu, X, Landmark, Calculator } from 'lucide-react';
import { dbService } from '../services/db';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
  onOpenGoldLoanModal: () => void;
  onOpenGeneralLoanModal?: (loanType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  currentPath,
  onOpenGoldLoanModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = dbService.getSettings();

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'Mahadev Finance', path: 'loans' },
    { name: 'DC Property Vala', path: 'property' },
    { name: 'Bank Leasing', path: 'rental' },
    { name: 'Academic Libraries', path: 'library' },
    { name: 'About Us', path: 'about' },
    { name: 'Contact', path: 'contact' }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - Clean Enterprise Wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full border border-slate-200 bg-white p-0.5 flex items-center justify-center shrink-0 group-hover:border-[#024089] transition-colors shadow-xs overflow-hidden">
            <img
              src="https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg"
              alt="Mahadev Group"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-900 tracking-tight group-hover:text-[#024089] transition-colors block leading-tight">
              MAHADEV GROUP
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase block">
              Finance • Properties • Libraries
            </span>
          </div>
        </button>

        {/* Desktop Menu Links */}
        <ul className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-700">
          {[
            { name: 'Home', path: 'home' },
            { name: 'Finance', path: 'loans' },
            { name: 'Properties', path: 'property' },
            { name: 'Bank Leasing', path: 'rental' },
            { name: 'Libraries', path: 'library' },
            { name: 'About', path: 'about' },
            { name: 'Contact', path: 'contact' }
          ].map((link) => {
            const isActive = currentPath === link.path;
            return (
              <li key={link.path}>
                <button
                  onClick={() => onNavigate(link.path)}
                  className={`transition-colors cursor-pointer py-1 ${
                    isActive
                      ? 'text-[#024089] font-bold border-b-2 border-[#024089]'
                      : 'text-slate-600 hover:text-[#024089]'
                  }`}
                >
                  {link.name}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#024089]" />
            <span>{settings.phone}</span>
          </a>

          <button
            onClick={onOpenGoldLoanModal}
            className="bg-[#024089] hover:bg-[#012d61] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Loan</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-[#024089] cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#024089]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1.5 text-xs font-semibold">
            {[
              { name: 'Home', path: 'home' },
              { name: 'Finance', path: 'loans' },
              { name: 'Properties', path: 'property' },
              { name: 'Bank Leasing', path: 'rental' },
              { name: 'Libraries', path: 'library' },
              { name: 'About', path: 'about' },
              { name: 'Contact', path: 'contact' }
            ].map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    onNavigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                    isActive ? 'bg-blue-50 text-[#024089] font-bold border border-blue-200' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenGoldLoanModal();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#024089] hover:bg-[#012d61] text-white py-2.5 rounded-lg text-xs font-semibold text-center cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Instant Gold Loan Form</span>
            </button>

            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="w-full text-center flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              <Phone className="w-4 h-4 text-[#024089]" />
              <span>Call Helpline ({settings.phone})</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
