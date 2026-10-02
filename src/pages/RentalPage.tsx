import React, { useState } from 'react';
import {
  Landmark,
  Building2,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Phone,
  FileText,
  BadgeCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { dbService } from '../services/db';

interface RentalPageProps {
  onOpenPropertyModal: (property?: any) => void;
}

export const RentalPage: React.FC<RentalPageProps> = ({ onOpenPropertyModal }) => {
  const settings = dbService.getSettings();
  const bankProperties = dbService.getProperties().filter((p) => p.suitableForBank || p.purpose === 'Rent');
  const cms = dbService.getContent().rental || {};
  const header = cms.header || {};
  const trustCms = cms.trust || {};

  const [reqForm, setReqForm] = useState({
    name: '',
    mobile: '',
    bankName: '',
    carpetAreaNeeded: '2,500 sq.ft'
  });

  const [reqSubmitted, setReqSubmitted] = useState(false);

  const handleReqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqForm.name || reqForm.mobile.length < 10) return;

    dbService.addApplication(
      'rental-enquiry',
      'Rental',
      `Bank Space Request: ${reqForm.bankName || 'PSU Bank'} (${reqForm.carpetAreaNeeded})`,
      reqForm.name,
      reqForm.mobile,
      'Jodhpur',
      {
        bankName: reqForm.bankName,
        carpetAreaNeeded: reqForm.carpetAreaNeeded
      }
    );

    setReqSubmitted(true);
  };

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen pb-20">

      {/* SEO: Primary H1 for rental page */}
      <h1 className="sr-only">
        Commercial Property on Rent Jodhpur for Banks \u2013 SBI PNB BOB Branch Spaces for Lease | Ground Floor Commercial Rental | DC Property Vala Jodhpur Rajasthan
      </h1>

      {/* 1. Header */}
      <section className="pt-24 pb-12 px-4 border-b border-slate-200 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <span>{header.badge?.value || 'DC Property Vala - Commercial Bank Desk Jodhpur'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {header.title?.value || 'Commercial Leasing for Nationalized Banks'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Ground-floor commercial premises matching SBI, PNB, and Bank of Baroda branch layout norms in Jodhpur.
          </p>

          {/* 4 Bank Specs Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 text-xs text-slate-700">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#024089] shrink-0" />
              <span>Ground Floor Only</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#024089] shrink-0" />
              <span>RCC Strongroom Ready</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#024089] shrink-0" />
              <span>Dedicated ATM Frontage</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#024089] shrink-0" />
              <span>100% Commercial NOC</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bank Ready Inventory */}
      <section className="max-w-6xl mx-auto px-4 pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">Pre-Screened</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Bank Branch Premises ({bankProperties.length})</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Jodhpur Commercial Belts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bankProperties.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all flex flex-col group shadow-xs"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#024089] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-xs">
                  Bank Ready Shell
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.area}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-3 text-xs">
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-[#024089] transition-colors">{item.title}</h3>
                  <p className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Tariff</span>
                    <strong className="text-base font-bold font-mono text-[#024089]">{item.price}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenPropertyModal(item)}
                      className="px-3.5 py-2 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-lg text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
                    >
                      Enquire Space
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Fast Bank Space Request Desk */}
      <section className="max-w-2xl mx-auto px-4 pt-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-4">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Corporate Requirement Desk
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2">
              Submit Bank or Showroom Space Requirement
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Need custom carpet area or highway frontage? We source off-market verified premises.
            </p>
          </div>

          {reqSubmitted ? (
            <div className="py-6 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-sm font-bold text-slate-900">Space Request Logged Successfully</p>
              <p className="text-xs text-slate-500">Our commercial leasing director will contact you directly.</p>
            </div>
          ) : (
            <form onSubmit={handleReqSubmit} className="space-y-3 pt-2 text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Officer / Representative Name"
                  value={reqForm.name}
                  onChange={(e) => setReqForm({ ...reqForm, name: e.target.value })}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-[#024089] focus:bg-white"
                />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit Phone Number"
                  value={reqForm.mobile}
                  onChange={(e) => setReqForm({ ...reqForm, mobile: e.target.value.replace(/\D/g, '') })}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono outline-none focus:border-[#024089] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Bank or Organization (e.g. SBI, PNB)"
                  value={reqForm.bankName}
                  onChange={(e) => setReqForm({ ...reqForm, bankName: e.target.value })}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-[#024089] focus:bg-white"
                />
                <select
                  value={reqForm.carpetAreaNeeded}
                  onChange={(e) => setReqForm({ ...reqForm, carpetAreaNeeded: e.target.value })}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-[#024089] focus:bg-white"
                >
                  <option value="1,500 – 2,500 sq.ft">1,500 – 2,500 sq.ft (Standard Branch)</option>
                  <option value="2,500 – 4,500 sq.ft">2,500 – 4,500 sq.ft (Main Branch + Locker)</option>
                  <option value="5,000+ sq.ft">5,000+ sq.ft (Zonal / Regional Office)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!reqForm.name || reqForm.mobile.length < 10}
                className="w-full py-3 bg-[#024089] hover:bg-[#012d61] text-white font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-xs disabled:opacity-50 transition-colors"
              >
                Submit Commercial Space Requirement
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span>Direct Commercial Desk: <a href="tel:9828394293" className="font-bold text-[#024089] hover:underline">+91 98283 94293</a></span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Director: <a href="tel:9413792922" className="font-bold text-slate-700 hover:underline">+91 94137 92922</a></span>
          </div>
        </div>
      </section>

    </div>
  );
};
