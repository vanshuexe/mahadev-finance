import React from 'react';
import {
  BookOpen,
  Wifi,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Users,
  ArrowRight
} from 'lucide-react';
import { dbService } from '../services/db';

interface LibraryPageProps {
  onOpenLibraryModal: (wing?: 'Saraswati Girls Library' | 'Mahadev Boys Library') => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ onOpenLibraryModal }) => {
  const libConfig = dbService.getLibraryConfig();
  const settings = dbService.getSettings();
  const cms = dbService.getContent().library || {};
  const header = cms.header || {};
  const girlsCms = cms.girlsWing || {};
  const boysCms = cms.boysWing || {};
  const featuresCms = cms.features || {};
  const ctaCms = cms.cta || {};

  const girlsTotal = libConfig.girlsLibrary.totalSeats;
  const girlsOccupied = libConfig.girlsLibrary.occupiedSeats;
  const girlsAvailable = Math.max(0, girlsTotal - girlsOccupied);

  const boysTotal = libConfig.boysLibrary.totalSeats;
  const boysOccupied = libConfig.boysLibrary.occupiedSeats;
  const boysAvailable = Math.max(0, boysTotal - boysOccupied);

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen pb-20">

      {/* SEO: Primary H1 for library page */}
      <h1 className="sr-only">
        Best 24x7 Study Library Jodhpur – Saraswati Girls Library &amp; Mahadev Boys Library at Saraswati Nagar | AC Soundproof Cubicles | UPSC RAS SSC Library Jodhpur Rajasthan
      </h1>

      {/* 1. Header */}
      <section className="pt-24 pb-12 px-4 border-b border-slate-200 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <span>{header.badge?.value || 'Academic Infrastructure · Saraswati Nagar, Jodhpur'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {header.title?.value || 'Soundproof Study Libraries with Biometric Access'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {header.subtitle?.value || 'Separate Saraswati Girls & Mahadev Boys wings, dedicated female warden, 300 Mbps fiber & 24/7 power backup at Veer Tejaji Tower, Ramdev Chowk, Saraswati Nagar, Jodhpur.'}
          </p>
        </div>
      </section>

      {/* 2. Real-Time Occupancy Bar */}
      <section className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Live Biometric Seat Occupancy
            </span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Girls Wing */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{girlsCms.name?.value || 'Saraswati Girls Wing'}</span>
                <span className="font-bold text-[#024089] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{girlsAvailable} Desks Left</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#024089] h-full"
                  style={{ width: `${Math.round((girlsOccupied / girlsTotal) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Occupied: {girlsOccupied}</span>
                <span>Capacity: {girlsTotal}</span>
              </div>
            </div>

            {/* Boys Wing */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">Mahadev Boys Wing</span>
                <span className="font-bold text-[#024089] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{boysAvailable} Desks Left</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#024089] h-full"
                  style={{ width: `${Math.round((boysOccupied / boysTotal) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Occupied: {boysOccupied}</span>
                <span>Capacity: {boysTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Branch Comparison Cards */}
      <section className="max-w-5xl mx-auto px-4 pt-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Girls Wing */}
          <div className="card-clean p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Girls Exclusive Wing
                </span>
                <span className="text-xs font-semibold text-slate-500">Biometric Locked</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">Saraswati Girls Library</h3>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Resident female security warden</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ergonomic high-back cushioned chairs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Private partitioned cubicle with LED lamp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dual 300 Mbps optical fiber connections</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenLibraryModal('Saraswati Girls Library')}
              className="w-full bg-[#024089] hover:bg-[#012d61] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
            >
              Book Free 1-Day Trial Desk
            </button>
          </div>

          {/* Boys Wing */}
          <div className="card-clean p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Boys Wing
                </span>
                <span className="text-xs font-semibold text-slate-500">24/7 Air Conditioned</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">Mahadev Boys Library</h3>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>24/7 access option for late-night preparation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% pin-drop soundproof acoustic ceiling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated charging socket on every desk</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>RO chilled drinking water & clean washrooms</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenLibraryModal('Mahadev Boys Library')}
              className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Reserve Desk Space
            </button>
          </div>

        </div>
      </section>

      {/* 4. Shift & Tariff Schedule */}
      <section className="max-w-5xl mx-auto px-4 pt-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Shift Timings & Monthly Tariffs</h3>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">Zero Admission Fees</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {libConfig.shifts.map((shift) => (
              <div key={shift.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">{shift.name}</span>
                <p className="text-slate-900 font-bold">{shift.timings}</p>
                <p className="text-base font-bold text-[#024089] pt-1">₹{shift.monthlyFee} /mo</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-col gap-0.5 text-slate-700">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">Campus Address:</span>
                <span>Veer Tejaji Tower, Ramdev Chowk, Saraswati Nagar, Jodhpur</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Admissions Desk Direct:</span>
                <a href={`tel:${(settings.phoneTertiary || '7300494293').replace(/\s+/g, '')}`} className="font-bold text-[#024089] hover:underline">
                  {settings.phoneTertiary || '+91 73004 94293'}
                </a>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Veer+tejaji+tower+ramdev+chowk+saraswati+nagar+jodhpur"
              target="_blank"
              rel="noreferrer"
              className="text-[#024089] font-bold hover:underline shrink-0"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
