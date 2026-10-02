import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Building2,
  Filter,
  BadgeCheck,
  MessageCircle,
  Phone,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Instagram
} from 'lucide-react';
import { dbService, PropertyListingItem } from '../services/db';

interface PropertyPageProps {
  onOpenPropertyModal: (property?: any, mode?: 'enquire' | 'list') => void;
  onNavigate?: (path: string) => void;
}

export const PropertyPage: React.FC<PropertyPageProps> = ({ onOpenPropertyModal }) => {
  const allProperties = dbService.getProperties();
  const settings = dbService.getSettings();
  const cms = dbService.getContent().properties || {};
  const header = cms.header || {};
  const trustCms = cms.trust || {};
  const ctaCms = cms.cta || {};

  // Filter States
  const [purposeFilter, setPurposeFilter] = useState<'All' | 'Rent' | 'Buy'>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Active image slide per property
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  const nextImage = (id: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndices((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total
    }));
  };

  const prevImage = (id: string, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndices((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + total) % total
    }));
  };

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((item) => {
      const matchPurpose = purposeFilter === 'All' || item.purpose === purposeFilter;
      const matchType = typeFilter === 'All' || item.type === typeFilter;
      const matchSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchPurpose && matchType && matchSearch;
    });
  }, [allProperties, purposeFilter, typeFilter, searchTerm]);

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen pb-20">

      {/* SEO: Primary H1 for property page */}
      <h1 className="sr-only">
        Commercial Property Jodhpur for Banks – SBI PNB BOB Branch Ready Spaces | NH-48 Plots | DC Property Vala Jodhpur Rajasthan
      </h1>

      {/* 1. Header &amp; Filter Bar */}
      <section className="pt-24 pb-8 px-4 border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
                <span>{header.badge?.value || 'DC Property Vala · Verified Regional Inventory'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                {header.title?.value || 'Commercial & Bank-Ready Properties'}
              </h1>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 text-pink-700 border border-pink-200 px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>@dcpropertyvala_jodhpur</span>
                </a>
              )}
              <button
                onClick={() => onOpenPropertyModal(undefined, 'list')}
                className="w-fit bg-[#024089] hover:bg-[#012d61] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your Property</span>
              </button>
            </div>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
            {/* Purpose Segmented Control */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 w-full md:w-auto">
              {(['All', 'Rent', 'Buy'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPurposeFilter(tab)}
                  className={`flex-1 md:flex-none px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                    purposeFilter === tab
                      ? 'bg-[#024089] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'All' ? 'All Listings' : tab === 'Rent' ? 'For Rent / Lease' : 'For Sale'}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 w-full md:w-auto">
              {['All', 'Commercial', 'Plot', 'House'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`flex-1 md:flex-none px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                    typeFilter === type
                      ? 'bg-[#024089] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search location, sq.ft..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:border-[#024089] outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Listings Grid */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-6">
          <span>Showing {filteredProperties.length} verified listings</span>
          <span>Jodhpur & Rajasthan Corridors</span>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No properties match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We have unlisted bank spaces and plots. Contact our desk for private listings.
            </p>
            <button
              onClick={() => {
                setPurposeFilter('All');
                setTypeFilter('All');
                setSearchTerm('');
              }}
              className="text-xs text-[#024089] font-bold hover:underline cursor-pointer pt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => {
              const images = prop.images && prop.images.length > 0
                ? prop.images
                : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'];
              const currentImgIdx = activeImageIndices[prop.id] || 0;

              return (
                <div
                  key={prop.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all flex flex-col group shadow-xs"
                >
                  {/* Photo Carousel */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden select-none">
                    <img
                      src={images[currentImgIdx]}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />

                    {/* Controls */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => prevImage(prop.id, images.length, e)}
                          aria-label="Previous"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1 rounded-full cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => nextImage(prop.id, images.length, e)}
                          aria-label="Next"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1 rounded-full cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Verified Title
                      </span>
                      {prop.suitableForBank && (
                        <span className="bg-[#024089] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          Bank Ready
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5 bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-slate-200">
                      {prop.purpose}
                    </div>

                    {/* Bottom Specs on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white font-bold bg-black/70 px-2 py-0.5 rounded">
                        {prop.area}
                      </span>
                      {images.length > 1 && (
                        <span className="text-white bg-black/70 px-1.5 py-0.5 rounded text-[10px]">
                          {currentImgIdx + 1}/{images.length}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between gap-3 text-xs">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-[#024089] transition-colors">{prop.title}</h3>
                      <p className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </p>
                    </div>

                    {/* Clean Feature Line */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 py-1 border-t border-slate-100">
                      {prop.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Tariff / Price</span>
                        <strong className="text-base font-bold font-mono text-[#024089]">{prop.price}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${settings.whatsapp}?text=Hello%20DC%20Property%20Vala,%20inquiring%20about:%20${encodeURIComponent(prop.title)}%20(${prop.location})`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 border border-slate-200 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="WhatsApp Desk"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => onOpenPropertyModal(prop)}
                          className="px-3.5 py-2 bg-[#024089] hover:bg-[#012d61] text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
                        >
                          Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
