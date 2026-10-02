import React, { useState } from 'react';
import {
  Coins,
  Landmark,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  MapPin,
  Building2,
  Percent,
  Calculator,
  UserCheck
} from 'lucide-react';
import { dbService, PropertyListingItem } from '../services/db';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenGoldLoanModal: () => void;
  onOpenGeneralLoanModal: (loanType?: string) => void;
  onOpenPropertyModal: (property?: PropertyListingItem) => void;
  onOpenLibraryModal: (wing?: 'Saraswati Girls Library' | 'Mahadev Boys Library') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenGoldLoanModal,
  onOpenGeneralLoanModal,
  onOpenPropertyModal,
  onOpenLibraryModal
}) => {
  // Database state
  const settings = dbService.getSettings();
  const libConfig = dbService.getLibraryConfig();
  const properties = dbService.getProperties();
  const content = dbService.getContent().home;

  // Fast Interactive Calculators & Sliders
  const [goldGrams, setGoldGrams] = useState<number>(30);
  const [activeWidgetTab, setActiveWidgetTab] = useState<'gold' | 'property' | 'library'>('gold');

  // Quick Callback Form
  const [quickPhone, setQuickPhone] = useState('');
  const [quickName, setQuickName] = useState('');
  const [callbackDone, setCallbackDone] = useState(false);

  // Property Filter
  const [propCategory, setPropCategory] = useState<'all' | 'commercial' | 'plot'>('all');

  const filteredProperties = properties
    .filter((p) => {
      if (propCategory === 'all') return true;
      if (propCategory === 'commercial') return p.suitableForBank || p.type === 'Commercial' || p.type === 'Shop' || p.type === 'Building';
      if (propCategory === 'plot') return p.type === 'Plot';
      return true;
    })
    .slice(0, 6);

  // Gold loan calculation estimates (0.79% p.m. tariff, ~₹5,600/gm)
  const estimatedGoldCash = goldGrams * 5600;
  const estimatedMonthlyInterest = Math.round(estimatedGoldCash * 0.0079);

  const handleQuickCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || quickPhone.length < 10) return;
    dbService.addApplication(
      'general-loan-enquiry',
      'Finance',
      'Instant Hero Callback Request',
      quickName,
      quickPhone,
      'Neemrana',
      { channel: 'Home Hero Quick Action' }
    );
    setCallbackDone(true);
  };

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen">

      {/* SEO: Visually hidden H1 for search engines – Mahadev Group's primary keyword */}
      <h1 className="sr-only">
        Mahadev Finance Jodhpur – Instant Gold Loan at 0.79% p.m. | DC Property Vala – Commercial Bank Spaces | Saraswati &amp; Mahadev 24x7 Study Library Jodhpur
      </h1>

      {/* SEO: Hidden location & service context for crawlers */}
      <address className="sr-only" itemScope itemType="https://schema.org/LocalBusiness">
        <span itemProp="name">Mahadev Finance Jodhpur</span> –
        <span itemProp="description">Instant gold loan at 0.79% per month in Jodhpur, Rajasthan. 15-minute cash disbursal at Jalori Gate. Also offering commercial property for banks and 24x7 study libraries.</span>
        <span itemProp="telephone">+91-7728894293</span>
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">93 Himmat Jai Motor Vali Gali, Near SBI Bank, Jalori Gate</span>,
          <span itemProp="addressLocality">Jodhpur</span>,
          <span itemProp="addressRegion">Rajasthan</span>,
          <span itemProp="postalCode">342001</span>,
          <span itemProp="addressCountry">India</span>
        </span>
      </address>

      {/* 1. HERO BANNER - Pure Visual Banner */}
      <section className="relative w-full pt-16 overflow-hidden border-b border-slate-200 bg-slate-100">
        <div className="w-full h-[240px] sm:h-[360px] lg:h-[440px] relative">
          <img
            src={content.hero?.bgImage?.value || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=85"}
            alt="Mahadev Group Commercial Architecture"
            className="w-full h-full object-cover object-center"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* 2. CORPORATE HIGHLIGHT STRIP */}
      <section className="bg-[#024089] py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-center gap-6 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8 w-full lg:w-auto">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-[#024089]">
              {content.stats?.yearsNumber?.value || '15+'}
            </span>
            <div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {content.stats?.yearsText?.value || 'Years of Institutional Trust'}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {content.stats?.yearsSubtext?.value || 'Premier Finance, Commercial Real Estate & Academics in Jodhpur & Rajasthan'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full lg:w-auto">
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-black text-slate-900">{content.stats?.goldRate?.value || '0.79%'}</span>
              <p className="text-xs text-slate-600 font-medium">{content.stats?.goldRateText?.value || 'Gold Loan Rate p.m.'}</p>
            </div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-black text-slate-900">{content.stats?.propVerified?.value || '100%'}</span>
              <p className="text-xs text-slate-600 font-medium">{content.stats?.propVerifiedText?.value || 'Verified Property Titles'}</p>
            </div>
            <div className="text-left col-span-2 sm:col-span-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">{content.stats?.libraryDesks?.value || '500+'}</span>
              <p className="text-xs text-slate-600 font-medium">{content.stats?.libraryDesksText?.value || 'Library Study Desks'}</p>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenGoldLoanModal}
              className="w-full sm:w-auto bg-[#024089] hover:bg-[#012d61] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer text-center"
            >
              Instant Gold Loan
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FAST ACTION CONSOLE */}
      <section className="py-10 px-4 max-w-6xl mx-auto space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
          
          {/* Widget Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 mb-6">
            <button
              type="button"
              onClick={() => setActiveWidgetTab('gold')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeWidgetTab === 'gold'
                  ? 'bg-[#024089] text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Gold Loan Estimator</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveWidgetTab('property')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeWidgetTab === 'property'
                  ? 'bg-[#024089] text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <Landmark className="w-4 h-4 text-blue-500" />
              <span>Commercial Space Finder</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveWidgetTab('library')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeWidgetTab === 'library'
                  ? 'bg-[#024089] text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Library Seat Status</span>
            </button>
          </div>

          {/* TAB 1: GOLD ESTIMATOR WIDGET */}
          {activeWidgetTab === 'gold' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-semibold">Estimated Gold Weight:</span>
                  <span className="font-mono text-[#024089] font-bold text-sm bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {goldGrams} Grams
                  </span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(Number(e.target.value))}
                  className="w-full accent-[#024089] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>10 Grams (~₹56,000)</span>
                  <span>100 Grams (~₹5.6 Lakh)</span>
                  <span>200 Grams (~₹11.2 Lakh)</span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Instant Cash</span>
                    <strong className="text-xl font-bold font-mono text-[#024089]">
                      ₹{estimatedGoldCash.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Monthly Tariff (0.79%)</span>
                    <strong className="text-sm font-bold font-mono text-emerald-600">
                      ₹{estimatedMonthlyInterest.toLocaleString('en-IN')}/mo
                    </strong>
                  </div>
                </div>

                <button
                  onClick={onOpenGoldLoanModal}
                  className="w-full bg-[#024089] hover:bg-[#012d61] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Apply Now · 15 Min Disbursal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTY FINDER WIDGET */}
          {activeWidgetTab === 'property' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-blue-700 block uppercase">Nationalized Banks</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Ground Floor Shells</p>
                <span className="text-xs text-slate-600 font-medium">1,500 – 6,000 sq.ft</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-blue-700 block uppercase">Approved Plots</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">RIICO & NH-48</p>
                <span className="text-xs text-slate-600 font-medium">100 – 500 sq.yards</span>
              </div>

              <button
                onClick={() => onNavigate('property')}
                className="h-full py-4 bg-[#024089] hover:bg-[#012d61] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <span>Explore Available Spaces</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 3: LIBRARY SEAT WIDGET */}
          {activeWidgetTab === 'library' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                  <span>SARASWATI GIRLS WING</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">OPEN</span>
                </div>
                <p className="text-base font-bold text-slate-900 mt-1">
                  {libConfig.girlsLibrary.totalSeats - libConfig.girlsLibrary.occupiedSeats} Seats Left
                </p>
                <span className="text-xs text-slate-500">Dedicated female warden</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                  <span>MAHADEV BOYS WING</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">OPEN</span>
                </div>
                <p className="text-base font-bold text-slate-900 mt-1">
                  {libConfig.boysLibrary.totalSeats - libConfig.boysLibrary.occupiedSeats} Seats Left
                </p>
                <span className="text-xs text-slate-500">24/7 AC & Ergonomic chairs</span>
              </div>

              <button
                onClick={() => onOpenLibraryModal('Saraswati Girls Library')}
                className="h-full py-4 bg-[#024089] hover:bg-[#012d61] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <span>Reserve Free Trial Desk</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. THREE ENTERPRISE DIVISIONS (Clean Card Grid like Techtunenet) */}
      <section className="py-12 px-4 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
              Core Enterprise Divisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Solutions & Specialized Services
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Jalori Gate · Kudi Sector 5 · Saraswati Nagar (Jodhpur)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Mahadev Finance */}
          <div className="card-clean p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Mahadev Finance</h3>
                <p className="text-xs text-blue-700 font-semibold mt-0.5">Gold Loans & Business Capital</p>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>0.79% p.m. transparent interest rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bank-grade fireproof safe custody</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Immediate cash disbursal within 15 mins</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenGoldLoanModal}
              className="w-full bg-[#024089] hover:bg-[#012d61] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-xs"
            >
              Apply Gold Loan
            </button>
          </div>

          {/* Card 2: DC Property Vala */}
          <div className="card-clean p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#024089]">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">DC Property Vala</h3>
                <p className="text-xs text-blue-700 font-semibold mt-0.5">Commercial & Bank Leasing</p>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SBI, PNB & BOB approved branch specs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Prime NH-48 Highway commercial frontage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% legal title clearance & registry guidance</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('property')}
              className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Browse Commercial Spaces
            </button>
          </div>

          {/* Card 3: Academic Libraries */}
          <div className="card-clean p-6 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Academic Libraries</h3>
                <p className="text-xs text-blue-700 font-semibold mt-0.5">Saraswati Girls & Mahadev Boys</p>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Separate girls wing with female warden</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Soundproof acoustic study cubicles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>300 Mbps high-speed dual fiber Wi-Fi</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenLibraryModal('Saraswati Girls Library')}
              className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Book Desk Trial
            </button>
          </div>

        </div>
      </section>

      {/* 5. VERIFIED COMMERCIAL PROPERTY SHOWCASE */}
      <section className="py-14 px-4 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
                Commercial Real Estate Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Featured Bank Spaces & Plots
              </h2>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setPropCategory('all')}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                  propCategory === 'all' ? 'bg-[#024089] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPropCategory('commercial')}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                  propCategory === 'commercial' ? 'bg-[#024089] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bank Ready
              </button>
              <button
                onClick={() => setPropCategory('plot')}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                  propCategory === 'plot' ? 'bg-[#024089] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Plots
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={prop.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-slate-200">
                    {prop.type}
                  </div>
                  {prop.suitableForBank && (
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      Bank Ready
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between gap-3 text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-[#024089] transition-colors">
                      {prop.title}
                    </h3>
                    <p className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 py-2 border-y border-slate-100">
                    <span>Area: {prop.area}</span>
                    <span className="text-[#024089] font-bold">{prop.price}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenPropertyModal(prop)}
                      className="flex-1 py-2 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer text-center shadow-xs"
                    >
                      Enquire Space
                    </button>
                    <a
                      href={`https://wa.me/${settings.whatsapp}?text=Hello%20DC%20Property%20Vala,%20I%20am%20interested%20in:%20${encodeURIComponent(prop.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border border-slate-200 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('property')}
              className="text-xs font-bold text-[#024089] hover:underline cursor-pointer flex items-center gap-1 mx-auto"
            >
              <span>View All 18+ Jodhpur & Rajasthan Commercial Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. OUR 3 JODHPUR BRANCHES SECTION */}
      <section className="py-14 px-4 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
              Accessible Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Our 3 Prime Jodhpur Branches
            </h2>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-bold text-[#024089] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View detailed directions & timings</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Branch 1 */}
          <div className="bg-white rounded-2xl border-2 border-blue-500/40 p-5 shadow-xs flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wide">
                Head Office
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Jalori Gate Head Office
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                93, Himmat Jai Motor Vali Gali, Near SBI Bank, Jalori Gate, Jodhpur
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Landmark: Near SBI Bank, Jalori Gate
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Helpline:</span>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="font-bold text-[#024089] hover:underline">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#024089] font-bold text-[11px]">Gold Loan Desk</span>
                <a
                  href="https://maps.google.com/?q=93+Himmat+Jai+Motor+Vali+Gali+Near+SBI+Bank+Jalori+Gate+Jodhpur"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-blue-400 transition-colors">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wide">
                Property Division
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Kudi Sector 5 Branch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                5-G-21, Danga Tower, Kudi 5 Sector, Jodhpur
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Landmark: Danga Tower, Sector 5 Housing Board
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Property Desk:</span>
                <a href={`tel:${settings.phoneSecondary.replace(/\s+/g, '')}`} className="font-bold text-[#024089] hover:underline">
                  {settings.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#024089] font-bold text-[11px]">DC Property Vala Desk</span>
                <a
                  href="https://maps.google.com/?q=5-g-21+Danga+tower+kudi+5+sector+jodhpur"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Directions →
                </a>
              </div>
            </div>
          </div>

          {/* Branch 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-blue-400 transition-colors">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase tracking-wide">
                Academic Wing
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Saraswati Nagar Branch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Veer Tejaji Tower, Ramdev Chowk, Saraswati Nagar, Jodhpur
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Landmark: Ramdev Chowk, Veer Tejaji Tower
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Library Desk:</span>
                <a href={`tel:${settings.phoneTertiary.replace(/\s+/g, '')}`} className="font-bold text-[#024089] hover:underline">
                  {settings.phoneTertiary}
                </a>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#024089] font-bold text-[11px]">Saraswati & Mahadev Library</span>
                <a
                  href="https://maps.google.com/?q=Veer+tejaji+tower+ramdev+chowk+saraswati+nagar+jodhpur"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAST 15-MINUTE OFFICER CALLBACK (Clean Card) */}
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-4">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Direct Desk Contact
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              Request an Officer Callback
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Enter your contact details to receive a confidential callback from our Jodhpur desk within 15 minutes.
            </p>
          </div>

          {callbackDone ? (
            <div className="py-6 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-sm font-bold text-slate-900">Callback Scheduled Successfully</p>
              <p className="text-xs text-slate-500">Our representative will call {quickPhone} shortly.</p>
              <button
                onClick={() => setCallbackDone(false)}
                className="text-xs text-[#024089] font-bold hover:underline pt-2 cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuickCallback} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <input
                  type="text"
                  required
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder="Your Full Name"
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit Phone Number"
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!quickName || quickPhone.length < 10}
                className="w-full py-3 bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                Get 15-Minute Callback
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 pt-3 border-t border-slate-100 font-medium">
            <span>Direct Lines: <strong className="text-slate-800">{settings.phone}</strong> / <strong className="text-slate-800">{settings.phoneSecondary}</strong></span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Director: <strong className="text-slate-800">{settings.phoneExecutive}</strong></span>
          </div>
        </div>
      </section>

      {/* SEO: Keyword-rich text section for local search signals (visually styled, not hidden) */}
      <section className="bg-white border-t border-slate-100 py-8 px-4" aria-label="About Mahadev Group Jodhpur">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500 leading-relaxed">
            <div>
              <h2 className="text-sm font-bold text-slate-700 mb-2">Gold Loan in Jodhpur – 0.79% p.m.</h2>
              <p>
                Mahadev Finance at Jalori Gate, Jodhpur offers the most competitive gold loan rates in Rajasthan at just 0.79% per month. Get instant cash against gold jewellery (ornaments, coins, bars) within 15 minutes. Serving Jodhpur, Pali, Barmer, Jalore, and all of Rajasthan. Walk in with gold &amp; Aadhaar card – no lengthy paperwork.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-700 mb-2">Commercial Property for Banks in Jodhpur</h2>
              <p>
                DC Property Vala Jodhpur is Rajasthan's leading commercial real estate specialist for bank branch setups. We offer SBI-ready, PNB-approved, and BOB-compliant ground-floor commercial spaces across Jodhpur's prime locations: Jalori Gate, Kudi Bhagasani Road, NH-48 Highway, and Saraswati Nagar. RIICO plots also available.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-700 mb-2">24×7 Study Library Jodhpur – Saraswati Nagar</h2>
              <p>
                Saraswati Girls Library &amp; Mahadev Boys Library at Saraswati Nagar Jodhpur are open 24×7, 365 days. Ideal for UPSC, RAS, Bank PO, SSC, REET &amp; Police exam aspirants. Features include AC, soundproof cubicles, 300 Mbps dual-fiber Wi-Fi, biometric entry, CCTV, and a dedicated female warden for girl students.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
