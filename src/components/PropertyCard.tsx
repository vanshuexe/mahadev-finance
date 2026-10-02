import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import { PropertyListingItem, dbService } from '../services/db';

interface PropertyCardProps {
  property: PropertyListingItem;
  onEnquire: (property: PropertyListingItem) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEnquire
}) => {
  const settings = dbService.getSettings();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const images =
    property.images && property.images.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80'];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentImgIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const whatsappText = encodeURIComponent(
    `Namaste DC Property Vala! I am interested in: ${property.title} at ${property.location} (${property.price}). Please share details.`
  );

  return (
    <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col group shadow-xs">
      {/* 1. Interactive Image Carousel */}
      <div
        className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentImgIndex]}
          alt={`${property.title} - photo ${currentImgIndex + 1}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 active:bg-black text-white rounded-full p-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 active:bg-black text-white rounded-full p-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap max-w-[70%]">
          {property.verified !== false && (
            <span className="flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
          {property.suitableForBank && (
            <span className="bg-[#024089] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
              Bank Ready
            </span>
          )}
        </div>

        <div className="absolute top-2.5 right-2.5">
          <span className="bg-white/95 border border-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase">
            {property.purpose}
          </span>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5">
            <span className="bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">
              {currentImgIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Photo ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentImgIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 flex flex-col flex-1 gap-3 bg-white text-slate-800">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
            <span className="text-blue-700 uppercase font-bold">{property.type}</span>
            <span>{property.area}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-[#024089] transition-colors">
            {property.title}
          </h3>

          <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>
        </div>

        {/* Spec highlights */}
        <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
          {property.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-slate-500 text-[10px] uppercase font-bold">Tariff / Price</p>
            <p className="text-[#024089] font-bold text-base sm:text-lg font-mono tabular-nums leading-tight truncate">
              {property.price}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 border border-slate-200 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => onEnquire(property)}
              className="px-3.5 py-2 bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
