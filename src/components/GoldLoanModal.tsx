import React, { useState } from 'react';
import { X, CheckCircle2, Coins, ShieldCheck, Clock } from 'lucide-react';
import { dbService } from '../services/db';

interface GoldLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoldLoanModal: React.FC<GoldLoanModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    approxWeightGrams: '25',
    goldType: 'Jewellery (Bangles, Chains, Rings)',
    requiredAmount: '₹1,50,000',
    purpose: 'Personal / Household Need',
    preferredTime: 'Morning (9 AM - 12 PM)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.mobile.length < 10) return;

    const record = dbService.addApplication(
      'gold-loan-enquiry',
      'Finance',
      `Gold Loan: ${formData.approxWeightGrams}g (${formData.requiredAmount})`,
      formData.name,
      formData.mobile,
      formData.city || 'Local',
      {
        approxWeightGrams: formData.approxWeightGrams,
        goldType: formData.goldType,
        requiredAmount: formData.requiredAmount,
        purpose: formData.purpose,
        preferredTime: formData.preferredTime,
        message: formData.message || 'Direct gold loan online application submitted.'
      }
    );

    setAppId(record.id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      mobile: '',
      city: '',
      approxWeightGrams: '25',
      goldType: 'Jewellery (Bangles, Chains, Rings)',
      requiredAmount: '₹1,50,000',
      purpose: 'Personal / Household Need',
      preferredTime: 'Morning (9 AM - 12 PM)',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-hidden">
      <div className="relative w-full max-w-lg bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                Gold Loan Application
              </h3>
              <p className="text-[11px] text-blue-700 font-semibold">
                Mahadev Finance · 15-Min Cash Disbursal
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
                Application Registered Successfully
              </h4>
              <p className="text-slate-600">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Application ID:{' '}
                <span className="font-mono font-bold text-[#024089] bg-blue-50 px-2 py-0.5 border border-blue-200 rounded">{appId}</span>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2">
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-1.5 font-medium">
                <span>Gold Weight Stated:</span>
                <strong className="text-slate-900 font-mono">{formData.approxWeightGrams} Grams</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-1.5 font-medium">
                <span>Requested Amount:</span>
                <strong className="text-[#024089] font-mono">{formData.requiredAmount}</strong>
              </div>
              <p className="text-slate-600 pt-1 leading-relaxed text-xs">
                Our loan valuation officer will call <strong className="text-[#024089] font-mono">{formData.mobile}</strong> within 15 minutes during your schedule ({formData.preferredTime}).
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Acknowledge & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center text-[10px] text-slate-700">
              <div className="flex items-center justify-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-blue-700" />
                <span>15-Min Cash</span>
              </div>
              <div className="flex items-center justify-center gap-1 font-semibold border-x border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Bank Vault</span>
              </div>
              <div className="flex items-center justify-center gap-1 font-semibold">
                <Coins className="w-3.5 h-3.5 text-blue-700" />
                <span>0.79% / Mo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
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
                <label className="font-semibold text-slate-700 block mb-1">Approx Gold Weight (Grams)</label>
                <input
                  type="number"
                  value={formData.approxWeightGrams}
                  onChange={(e) => setFormData({ ...formData, approxWeightGrams: e.target.value })}
                  placeholder="e.g. 25"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Estimated Loan Ticket</label>
                <select
                  value={formData.requiredAmount}
                  onChange={(e) => setFormData({ ...formData, requiredAmount: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                >
                  <option value="Under ₹50,000">Under ₹50,000</option>
                  <option value="₹50,000 – ₹1,50,000">₹50,000 – ₹1,50,000</option>
                  <option value="₹1,50,000 – ₹5,00,000">₹1,50,000 – ₹5,00,000</option>
                  <option value="Above ₹5,00,000">Above ₹5,00,000</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.name || formData.mobile.length < 10}
              className="w-full py-3.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-xs disabled:opacity-50 mt-2 transition-colors"
            >
              Submit Instant Gold Loan Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
