import React from 'react';
import {
  ShieldCheck,
  Landmark,
  BookOpen,
  Coins,
  CheckCircle2,
  Users,
  Award,
  Phone,
  Instagram,
  MapPin,
  Building
} from 'lucide-react';
import { dbService } from '../services/db';

export const AboutPage: React.FC = () => {
  const settings = dbService.getSettings();
  const content = dbService.getContent().about;

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen pb-20">

      {/* SEO: Primary H1 for about page */}
      <h1 className="sr-only">
        About Mahadev Group Jodhpur – 15+ Years Trusted Finance, Commercial Property &amp; Academic Library Company in Rajasthan | Jalori Gate | Kudi Sector 5 | Saraswati Nagar
      </h1>

      {/* 1. Hero Section with Office Banner */}
      <section className="relative pt-24 pb-14 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
        {/* Subtle background glow & texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src={content.hero?.officeImage?.value || settings.officeBannerUrl || "https://ik.imagekit.io/fdhgiehjz/tt.jpeg"}
            alt="Office Ambient Texture"
            className="w-full h-full object-cover blur-md scale-105"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-300 bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-500/40 uppercase tracking-wider backdrop-blur-xs">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span>Corporate Headquarters</span>
            <span aria-hidden="true" className="text-blue-400">·</span>
            <span>Jodhpur, Rajasthan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {content.hero?.title?.value || 'Institutional Trust & Regional Enterprise'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {content.hero?.subtitle?.value || '15+ years of transparent credit disbursal, commercial bank leasing, and dedicated academic infrastructure across Jodhpur.'}
          </p>

          {/* Featured Office Visual Banner */}
          <div className="pt-4 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-slate-800 group">
              <div className="relative aspect-[16/8] sm:aspect-[2.3/1] w-full overflow-hidden">
                <img
                  src={content.hero?.officeImage?.value || settings.officeBannerUrl || "https://ik.imagekit.io/fdhgiehjz/tt.jpeg"}
                  alt="Mahadev Group Corporate Office - Jalori Gate, Jodhpur"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  loading="eager"
                />
                
                {/* Gradient bottom bar with office details */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-transparent pt-12 pb-4 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-900/80 px-2.5 py-0.5 rounded border border-blue-400/40 inline-flex items-center gap-1.5 backdrop-blur-xs">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      <span>Head Office · Jalori Gate, Jodhpur</span>
                    </span>
                    <h2 className="text-base sm:text-xl font-extrabold text-white mt-1.5 drop-shadow-xs">
                      Mahadev Group Central Corporate Office
                    </h2>
                    <p className="text-xs text-slate-300 hidden sm:block mt-0.5">
                      {settings.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-end">
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active Central Desk</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Leadership & Metrics */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Founder Photo */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-52 h-64 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100 relative group">
              <img
                src={settings.founderImageUrl || "https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-29%20at%207.56.02%20PM_nKmI33Jdg.jpeg"}
                alt="Shri Dharmendra Choudhary Danga"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
            <h3 className="font-bold text-slate-900 text-base mt-3.5">Shri Dharmendra Choudhary Danga</h3>
            <p className="text-xs text-[#024089] font-bold">Founder & Managing Director</p>
            <span className="text-[11px] text-slate-500 font-medium">Mahadev Group of Enterprises</span>
            {/* Official Instagram Handles */}
            <div className="mt-3 flex flex-col gap-1.5 w-full max-w-[250px]">
              {settings.instagramPersonalUrl && (
                <a
                  href={settings.instagramPersonalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 text-pink-800 text-[11px] font-bold rounded-lg border border-pink-200 transition-colors shadow-2xs"
                  title="Personal Profile: @ekshivbhaktt___"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Instagram className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span className="truncate">@ekshivbhaktt___</span>
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-pink-200/70 text-pink-900 font-extrabold shrink-0">Personal</span>
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-800 text-[11px] font-bold rounded-lg border border-blue-200 transition-colors shadow-2xs"
                  title="DC Property Vala: @dcpropertyvala_jodhpur"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Instagram className="w-3.5 h-3.5 text-[#024089] shrink-0" />
                    <span className="truncate">@dcpropertyvala_jodhpur</span>
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-blue-200/70 text-blue-900 font-extrabold shrink-0">Property</span>
                </a>
              )}
              {settings.instagramFinanceUrl && (
                <a
                  href={settings.instagramFinanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between px-2.5 py-1 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-900 text-[11px] font-bold rounded-lg border border-amber-200 transition-colors shadow-2xs"
                  title="Mahadev Finance Desk: @mahadev_finance_jodhpur93"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Instagram className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">@mahadev_finance_jodhpur93</span>
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-200/70 text-amber-950 font-extrabold shrink-0">Finance</span>
                </a>
              )}
            </div>
          </div>

          {/* Core Philosophy & Quantitative Rigor */}
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Leadership Creed
            </span>
            <blockquote className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              "Trust in finance and real estate is not built on promises — it is built on transparent touchstones, verified deed titles, and zero hidden costs."
            </blockquote>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-left">
              <div>
                <strong className="text-2xl font-black text-[#024089] block">15+ Yrs</strong>
                <span className="text-xs text-slate-500 font-medium">Regional Trust</span>
              </div>
              <div>
                <strong className="text-2xl font-black text-[#024089] block">100%</strong>
                <span className="text-xs text-slate-500 font-medium">Clear Title Deeds</span>
              </div>
              <div>
                <strong className="text-2xl font-black text-[#024089] block">₹50Cr+</strong>
                <span className="text-xs text-slate-500 font-medium">Capital Disbursed</span>
              </div>
              <div>
                <strong className="text-2xl font-black text-[#024089] block">2,000+</strong>
                <span className="text-xs text-slate-500 font-medium">Students Guided</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Three Enterprise Divisions */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900">Three Enterprise Verticals</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="card-clean p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Mahadev Finance</h3>
            <p className="text-slate-600 leading-relaxed">
              Immediate gold loans at 0.79% monthly interest, business capital, and bank-grade safe vault custody.
            </p>
          </div>

          <div className="card-clean p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#024089]">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">DC Property Vala</h3>
            <p className="text-slate-600 leading-relaxed">
              Commercial bank branch leasing for SBI, PNB, and approved plots across Jodhpur & Rajasthan.
            </p>
          </div>

          <div className="card-clean p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Academic Libraries</h3>
            <p className="text-slate-600 leading-relaxed">
              Soundproof biometric study halls with separate Saraswati Girls & Mahadev Boys wings.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
