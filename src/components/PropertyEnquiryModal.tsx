import React, { useState } from 'react';
import { X, CheckCircle2, Landmark, Building, MapPin } from 'lucide-react';
import { PropertyListingItem, dbService } from '../services/db';

interface PropertyEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: PropertyListingItem | null;
  mode?: 'enquire' | 'list';
}

export const PropertyEnquiryModal: React.FC<PropertyEnquiryModalProps> = ({
  isOpen,
  onClose,
  property,
  mode = 'enquire'
}) => {
  const activeProp = property;

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    purpose: activeProp ? activeProp.purpose : 'Rent',
    propertyType: activeProp ? activeProp.type : 'Commercial',
    budgetOrPrice: activeProp ? activeProp.price : '₹45,000 / mo',
    location: activeProp ? activeProp.location : 'Jodhpur',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.mobile.length < 10) return;

    const record = dbService.addApplication(
      mode === 'list' ? 'property-listing-request' : 'property-enquiry',
      'Property',
      mode === 'list'
        ? `Property Listing: ${formData.propertyType} (${formData.location})`
        : `Property Enquiry: ${activeProp?.title || formData.propertyType}`,
      formData.name,
      formData.mobile,
      formData.city || 'Jodhpur',
      {
        propertyTitle: activeProp?.title || 'General Property',
        propertyType: formData.propertyType,
        budgetOrPrice: formData.budgetOrPrice,
        location: formData.location,
        purpose: formData.purpose,
        message: formData.message || 'Direct real estate inquiry.'
      }
    );

    setAppId(record.id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-hidden">
      <div className="relative w-full max-w-lg bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-[#024089] flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 text-[#024089]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                {mode === 'list' ? 'List Your Property Free' : 'Property Inspection Inquiry'}
              </h3>
              <p className="text-[11px] text-blue-700 font-semibold">
                DC Property Vala · Jodhpur Real Estate
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto flex-1 text-xs">
            <div className="w-12 h-12 bg-emerald-100 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-lg text-slate-900">
                {mode === 'list' ? 'Listing Submitted Successfully' : 'Inspection Request Logged'}
              </h4>
              <p className="text-slate-600">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Inquiry Reference:{' '}
                <span className="font-mono font-bold text-[#024089] bg-blue-50 px-2 py-0.5 border border-blue-200 rounded">{appId}</span>.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              Our real estate desk officer will contact <strong className="text-[#024089] font-mono">{formData.mobile}</strong> to arrange site coordinates or inspect documentation.
            </p>

            <button
              onClick={handleReset}
              className="w-full bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
            {activeProp && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase block">Selected Asset</span>
                <p className="font-bold text-slate-900 text-xs">{activeProp.title}</p>
                <p className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{activeProp.location} · {activeProp.price}</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                />
              </div>

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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Property Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                >
                  <option value="Commercial">Commercial / Bank Space</option>
                  <option value="Plot">Approved Residential Plot</option>
                  <option value="House">Independent House / Kothi</option>
                  <option value="Shop">Retail Shop / Showroom</option>
                  <option value="Industrial">Industrial RIICO Plot</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Expected Budget / Tariff</label>
                <input
                  type="text"
                  value={formData.budgetOrPrice}
                  onChange={(e) => setFormData({ ...formData, budgetOrPrice: e.target.value })}
                  placeholder="e.g. ₹50,000 / mo or ₹35 Lakhs"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Specific Requirements / Site Visit Notes</label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention preferred dates for site visit or carpet area needed..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!formData.name || formData.mobile.length < 10}
              className="w-full py-3.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-xs disabled:opacity-50 mt-1 transition-colors"
            >
              {mode === 'list' ? 'Publish Property to Directory' : 'Confirm Site Inspection Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
