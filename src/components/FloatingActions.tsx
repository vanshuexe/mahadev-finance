import React, { useState } from 'react';
import { MessageCircle, Phone, Calculator, Instagram, X } from 'lucide-react';
import { dbService } from '../services/db';

interface FloatingActionsProps {
  onOpenGoldLoanModal: () => void;
  onOpenGeneralLoanModal?: (loanType?: string) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenGoldLoanModal }) => {
  const settings = dbService.getSettings();
  const [showInstaMenu, setShowInstaMenu] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
      
      {/* Instagram Multi-Account Floating Hub */}
      <div className="relative">
        {showInstaMenu && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-2 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 px-1">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram Channels</span>
              </span>
              <button
                onClick={() => setShowInstaMenu(false)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 text-slate-900 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-[#024089] truncate">DC Property Vala</div>
                  <div className="text-[10px] text-slate-500 truncate">@dcpropertyvala_jodhpur</div>
                </div>
                <span className="text-[9px] font-bold bg-[#024089] text-white px-2 py-0.5 rounded shrink-0">Visit</span>
              </a>
            )}

            {settings.instagramFinanceUrl && (
              <a
                href={settings.instagramFinanceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 text-slate-900 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-amber-800 truncate">Mahadev Finance</div>
                  <div className="text-[10px] text-slate-500 truncate">@mahadev_finance_jodhpur93</div>
                </div>
                <span className="text-[9px] font-bold bg-amber-700 text-white px-2 py-0.5 rounded shrink-0">Visit</span>
              </a>
            )}

            {settings.instagramPersonalUrl && (
              <a
                href={settings.instagramPersonalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-xl bg-pink-50/70 hover:bg-pink-100/70 text-slate-900 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-pink-800 truncate">Dharmendra Choudhary</div>
                  <div className="text-[10px] text-slate-500 truncate">@ekshivbhaktt___</div>
                </div>
                <span className="text-[9px] font-bold bg-pink-600 text-white px-2 py-0.5 rounded shrink-0">Visit</span>
              </a>
            )}
          </div>
        )}

        <button
          onClick={() => setShowInstaMenu(!showInstaMenu)}
          className="px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 hover:text-pink-600 hover:border-pink-300 text-xs font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          title="Official Instagram Handles"
        >
          <Instagram className="w-4 h-4 text-pink-600" />
          <span className="hidden sm:inline">Instagram (3 Pages)</span>
        </button>
      </div>

      {/* Quick Calculator Trigger */}
      <button
        onClick={onOpenGoldLoanModal}
        className="px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 hover:text-[#024089] hover:border-[#024089] text-xs font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer"
        title="Instant Gold Loan Calculator"
      >
        <Calculator className="w-4 h-4 text-[#024089]" />
        <span className="hidden sm:inline">Gold Loan Desk</span>
      </button>

      {/* Direct Helpline Call */}
      <a
        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
        className="px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 hover:text-[#024089] hover:border-[#024089] text-xs font-semibold shadow-md transition-all flex items-center gap-2"
        title="Call Helpline"
      >
        <Phone className="w-4 h-4 text-[#024089]" />
        <span className="hidden sm:inline">{settings.phone}</span>
      </a>

      {/* Template Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings.whatsapp}?text=Namaste%20Mahadev%20Group,%20I%20have%20an%20enquiry.`}
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors animate-wa-pulse shadow-xl cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </a>

    </div>
  );
};
