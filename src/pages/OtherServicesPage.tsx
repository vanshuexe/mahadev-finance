import React from 'react';
import {
  Coins,
  Landmark,
  ShieldCheck,
  FileCheck,
  Building2,
  Lock,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';
import { dbService } from '../services/db';

interface OtherServicesPageProps {
  onOpenGeneralLoanModal: (loanType?: string) => void;
  onOpenPropertyModal: () => void;
  onOpenGoldLoanModal?: () => void;
}

export const OtherServicesPage: React.FC<OtherServicesPageProps> = ({
  onOpenGeneralLoanModal,
  onOpenPropertyModal
}) => {
  const servicesList = [
    {
      title: 'Loan Against Property (LAP)',
      category: 'Finance',
      highlight: 'Up to 75% LTV · Rates from 9.5% p.a.',
      action: () => onOpenGeneralLoanModal('Loan Against Property'),
      btnText: 'Enquire LAP'
    },
    {
      title: 'Commercial Refinancing',
      category: 'Credit Advisory',
      highlight: 'Reduce business loan EMI · Top-up capital',
      action: () => onOpenGeneralLoanModal('Refinancing / Balance Transfer'),
      btnText: 'Apply Transfer'
    },
    {
      title: 'Bank Vault Safe Custody',
      category: 'Security',
      highlight: 'Dual-key safe vaults · 24/7 armed protection',
      action: () => onOpenGeneralLoanModal('Safe Vault Custody'),
      btnText: 'Reserve Vault'
    },
    {
      title: 'Legal Title Verification',
      category: 'Real Estate',
      highlight: '30-year revenue search · Khasra/Khatauni checks',
      action: () => onOpenPropertyModal(),
      btnText: 'Verify Deed'
    },
    {
      title: 'NH-48 Industrial Land',
      category: 'RIICO Procurement',
      highlight: 'Direct owner deals · Heavy power & road connectivity',
      action: () => onOpenPropertyModal(),
      btnText: 'Inquire Land'
    },
    {
      title: 'Agricultural & Vehicle Credit',
      category: 'MSME Credit',
      highlight: 'Commercial pickups & tractors · 24-hr approval',
      action: () => onOpenGeneralLoanModal('Vehicle & Equipment Credit'),
      btnText: 'Apply Credit'
    }
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen pb-20">
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4 border-b border-slate-200 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <span>Specialized Facilities</span>
            <span aria-hidden="true" className="text-blue-300">·</span>
            <span>Jodhpur & Rajasthan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Ancillary Credit & <span className="text-[#024089]">Legal Services</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Property equity lines, dual-key safe custody, commercial balance transfers, and deed legal searches.
          </p>
        </div>
      </section>

      {/* Services Grid - Concise & Clean */}
      <section className="max-w-5xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv, idx) => (
            <div
              key={idx}
              className="card-clean p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {srv.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{srv.title}</h3>
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                  {srv.highlight}
                </p>
              </div>

              <button
                onClick={srv.action}
                className="w-full py-2.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
              >
                {srv.btnText}
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
