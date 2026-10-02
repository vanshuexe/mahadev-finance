import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Building,
  Landmark,
  BookOpen,
  Instagram
} from 'lucide-react';
import { dbService } from '../services/db';

export const ContactPage: React.FC = () => {
  const settings = dbService.getSettings();
  const branches = settings.branches || [];
  const cms = dbService.getContent().contact || {};
  const header = cms.header || {};
  const formCms = cms.formSection || {};
  const hoursCms = cms.officeHours || {};

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    branch: 'Jalori Gate Head Office',
    subject: 'General Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.mobile.length < 10) return;

    dbService.addApplication(
      'contact-us',
      'General',
      `Contact Desk Inquiry: ${formData.subject} (${formData.branch})`,
      formData.name,
      formData.mobile,
      formData.branch || 'Jodhpur Office',
      {
        email: formData.email,
        branch: formData.branch,
        subject: formData.subject,
        message: formData.message
      }
    );

    setSubmitted(true);
  };

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen pb-20">

      {/* SEO: Primary H1 for contact page */}
      <span className="sr-only" role="heading" aria-level={1}>
        Contact Mahadev Group Jodhpur – 3 Branches: Jalori Gate Gold Loan, Kudi Sector 5 Property, Saraswati Nagar Library | Call 7728894293
      </span>

      {/* Hero Header */}
      <section className="pt-24 pb-12 px-4 border-b border-slate-200 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <span>{header.badge?.value || 'Official Branches & Directions'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {header.title?.value || 'Visit Our Jodhpur Branches'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {header.subtitle?.value || 'Mahadev Group operates across 3 prime accessible locations in Jodhpur. Walk into any of our branches for immediate gold loan valuation, commercial space inspection, or library admissions.'}
          </p>
        </div>
      </section>

      {/* 3 Prime Branch Locations Grid */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
              Network of 3 Locations
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              Our Offices in Jodhpur
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Open Monday – Sunday · 8:00 AM – 9:00 PM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Branch 1: Jalori Gate (Head Office) */}
          <div className="bg-white rounded-2xl border-2 border-blue-500/40 p-6 shadow-sm flex flex-col justify-between gap-5 relative hover:border-[#024089] transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
                  Head Office
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active Desk
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Jalori Gate Head Office
                </h3>
                <p className="text-xs text-[#024089] font-semibold mt-0.5">
                  Instant Gold Loan & Central Corporate Desk
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#024089] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Address:</strong>
                    <span>93, Himmat Jai Motor Vali Gali, Near SBI Bank, Jalori Gate, Jodhpur</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Landmark:</strong>
                    <span>Near State Bank of India (SBI), Jalori Gate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex flex-col gap-1 text-[11px] font-semibold text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal">Desk Line:</span>
                  <a href={`tel:${(settings.branches?.[0]?.phone || settings.phone).replace(/\s+/g, '')}`} className="text-[#024089] hover:underline font-bold">
                    {settings.branches?.[0]?.phone || settings.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-normal">Executive:</span>
                  <a href={`tel:${settings.phoneExecutive.replace(/\s+/g, '')}`} className="text-[#024089] hover:underline font-bold">
                    {settings.phoneExecutive}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://maps.google.com/?q=93+Himmat+Jai+Motor+Vali+Gali+Near+SBI+Bank+Jalori+Gate+Jodhpur"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-[#024089] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Map</span>
                </a>
                <a
                  href={`tel:${(settings.branches?.[0]?.phone || settings.phone).replace(/\s+/g, '')}`}
                  className="py-2 px-3 bg-[#024089] hover:bg-[#012d61] text-white rounded-lg text-xs font-bold transition-colors"
                  title="Call Jalori Branch"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Branch 2: Kudi Sector 5 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between gap-5 relative hover:border-[#024089] transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 uppercase tracking-wide">
                  Property Division
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Kudi Sector 5 Branch
                </h3>
                <p className="text-xs text-[#024089] font-semibold mt-0.5">
                  DC Property Vala & Commercial Leasing
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#024089] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Address:</strong>
                    <span>5-G-21, Danga Tower, Kudi 5 Sector, Jodhpur</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Landmark className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Landmark:</strong>
                    <span>Danga Tower, Kudi Sector 5 Housing Board</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span className="text-slate-500 font-normal">Direct Desk:</span>
                <a href={`tel:${settings.phoneSecondary.replace(/\s+/g, '')}`} className="text-[#024089] hover:underline font-bold">
                  {settings.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://maps.google.com/?q=5-g-21+Danga+tower+kudi+5+sector+jodhpur"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-[#024089] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Map</span>
                </a>
                <a
                  href={`tel:${settings.phoneSecondary.replace(/\s+/g, '')}`}
                  className="py-2 px-3 bg-[#024089] hover:bg-[#012d61] text-white rounded-lg text-xs font-bold transition-colors"
                  title="Call Kudi Branch"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Branch 3: Saraswati Nagar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between gap-5 relative hover:border-[#024089] transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 uppercase tracking-wide">
                  Academic Wing
                </span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  24x7 Open
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Saraswati Nagar Branch
                </h3>
                <p className="text-xs text-[#024089] font-semibold mt-0.5">
                  Saraswati Girls & Mahadev Boys Library
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#024089] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Address:</strong>
                    <span>Veer Tejaji Tower, Ramdev Chowk, Saraswati Nagar, Jodhpur</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Landmark:</strong>
                    <span>Ramdev Chowk, Veer Tejaji Tower</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span className="text-slate-500 font-normal">Library Desk:</span>
                <a href={`tel:${settings.phoneTertiary.replace(/\s+/g, '')}`} className="text-[#024089] hover:underline font-bold">
                  {settings.phoneTertiary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://maps.google.com/?q=Veer+tejaji+tower+ramdev+chowk+saraswati+nagar+jodhpur"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-[#024089] font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Map</span>
                </a>
                <a
                  href={`tel:${settings.phoneTertiary.replace(/\s+/g, '')}`}
                  className="py-2 px-3 bg-[#024089] hover:bg-[#012d61] text-white rounded-lg text-xs font-bold transition-colors"
                  title="Call Library Branch"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Grid: Direct Contact Details & Message Form */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Central Communications Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-1">
                Official Directory
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Direct Contact Helpline
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              {/* Phone Line 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#024089] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Main Helpline & Gold Loan Desk</h3>
                    <p className="text-[11px] text-slate-500">Jalori Gate Head Office</p>
                  </div>
                </div>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-lg text-xs whitespace-nowrap transition-colors"
                >
                  {settings.phone}
                </a>
              </div>

              {/* Phone Line 2 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#024089] flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">DC Property Vala & Bank Leasing</h3>
                    <p className="text-[11px] text-slate-500">Kudi Sector 5 Branch</p>
                  </div>
                </div>
                <a
                  href={`tel:${settings.phoneSecondary.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-lg text-xs whitespace-nowrap transition-colors"
                >
                  {settings.phoneSecondary}
                </a>
              </div>

              {/* Phone Line 3 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#024089] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Library Admissions Desk</h3>
                    <p className="text-[11px] text-slate-500">Saraswati Nagar Branch</p>
                  </div>
                </div>
                <a
                  href={`tel:${settings.phoneTertiary.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-lg text-xs whitespace-nowrap transition-colors"
                >
                  {settings.phoneTertiary}
                </a>
              </div>

              {/* Phone Line 4 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">Executive Director Desk</h3>
                    <p className="text-[11px] text-slate-500">Senior Officer Line</p>
                  </div>
                </div>
                <a
                  href={`tel:${settings.phoneExecutive.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg text-xs whitespace-nowrap transition-colors"
                >
                  {settings.phoneExecutive}
                </a>
              </div>

              {/* Instagram Channels */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Official Instagram Profiles
                </span>

                {/* 1. DC Property Vala */}
                {settings.instagramUrl && (
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/60 border border-blue-200/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#024089] flex items-center justify-center shrink-0">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate">DC Property Vala</h4>
                        <p className="text-[11px] text-slate-600 truncate">@dcpropertyvala_jodhpur</p>
                      </div>
                    </div>
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-lg text-xs whitespace-nowrap transition-all shrink-0"
                    >
                      Follow
                    </a>
                  </div>
                )}

                {/* 2. Mahadev Finance */}
                {settings.instagramFinanceUrl && (
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-50/80 via-orange-50/60 to-yellow-50/60 border border-amber-200/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate">Mahadev Finance</h4>
                        <p className="text-[11px] text-slate-600 truncate">@mahadev_finance_jodhpur93</p>
                      </div>
                    </div>
                    <a
                      href={settings.instagramFinanceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-lg text-xs whitespace-nowrap transition-all shrink-0"
                    >
                      Follow
                    </a>
                  </div>
                )}

                {/* 3. Founder Personal Profile */}
                {settings.instagramPersonalUrl && (
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-pink-50/80 via-rose-50/60 to-purple-50/60 border border-pink-200/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate">Dharmendra Choudhary Danga</h4>
                        <p className="text-[11px] text-slate-600 truncate">@ekshivbhaktt___</p>
                      </div>
                    </div>
                    <a
                      href={settings.instagramPersonalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold rounded-lg text-xs whitespace-nowrap transition-all shrink-0"
                    >
                      Follow
                    </a>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 pt-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#024089] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[#024089]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Official Email</h3>
                  <a href={`mailto:${settings.email}`} className="text-slate-600 hover:text-[#024089] font-medium">
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-[#024089] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-[#024089]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Working Hours</h3>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Finance & Real Estate: Monday – Sunday (8:00 AM – 9:00 PM)<br />
                    Saraswati & Mahadev Library Wings: 24 Hours Open (Biometric)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Namaste%20Mahadev%20Group,%20I%20have%20an%20enquiry%20regarding%20Jodhpur%20branch.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp ({settings.phone})</span>
              </a>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex-1 py-2.5 px-4 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
              >
                <Phone className="w-4 h-4 text-[#024089]" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block mb-1">
                Direct Submission
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Send a Message to the Desk
              </h2>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Message Delivered Successfully</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. An officer from the selected branch will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#024089] hover:underline pt-2 cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Select Branch
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                    >
                      <option value="Jalori Gate Head Office">Jalori Gate Head Office (Near SBI Bank)</option>
                      <option value="Kudi Sector 5 Branch">Kudi Sector 5 (Danga Tower)</option>
                      <option value="Saraswati Nagar Branch">Saraswati Nagar (Veer Tejaji Tower)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                  >
                    <option value="Mahadev Finance (Gold Loan)">Mahadev Finance (Instant Gold Loan @ 0.79%)</option>
                    <option value="Mahadev Finance (Business Loan)">Mahadev Finance (MSME / Business Loan)</option>
                    <option value="DC Property Vala (Commercial Space)">DC Property Vala (Commercial & Bank Space)</option>
                    <option value="DC Property Vala (Plots & Houses)">DC Property Vala (Residential Plots / Houses)</option>
                    <option value="Library Admission Enquiry">Saraswati & Mahadev Library Admission</option>
                    <option value="General Enquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Message</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry or requirement..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formData.name || formData.mobile.length < 10}
                  className="w-full py-3.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  Send Inquiry to Branch Officer
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

    </div>
  );
};
