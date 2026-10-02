import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Landmark } from 'lucide-react';
import { dbService } from '../services/db';

interface GeneralLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLoanType?: string;
}

export const GeneralLoanModal: React.FC<GeneralLoanModalProps> = ({
  isOpen,
  onClose,
  defaultLoanType = 'General Loan Enquiry'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    loanCategory: defaultLoanType,
    requestedAmount: '₹3,00,000',
    employmentType: 'Salaried / Business Owner',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.mobile.length < 10) return;

    const record = dbService.addApplication(
      'general-loan-enquiry',
      'Finance',
      `Credit Enquiry: ${formData.loanCategory} (${formData.requestedAmount})`,
      formData.name,
      formData.mobile,
      formData.city || 'Local',
      {
        loanCategory: formData.loanCategory,
        requestedAmount: formData.requestedAmount,
        employmentType: formData.employmentType,
        message: formData.message || 'Direct online loan inquiry.'
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
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-[#024089] flex items-center justify-center shrink-0 font-bold">
              ₹
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                Loan & Credit Enquiry
              </h3>
              <p className="text-[11px] text-blue-700 font-semibold">
                Mahadev Finance · Business & Personal Credit
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
              <h4 className="font-extrabold text-lg text-slate-900">Enquiry Received Successfully</h4>
              <p className="text-slate-600">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Application Reference:{' '}
                <span className="font-mono font-bold text-[#024089] bg-blue-50 px-2 py-0.5 border border-blue-200 rounded">{appId}</span>.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              Our credit manager will contact you at <strong className="text-[#024089] font-mono">{formData.mobile}</strong> to confirm document requirements and interest schedule.
            </p>

            <button
              onClick={handleReset}
              className="w-full bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
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
                <label className="font-semibold text-slate-700 block mb-1">Loan Product</label>
                <select
                  value={formData.loanCategory}
                  onChange={(e) => setFormData({ ...formData, loanCategory: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                >
                  <option value="Instant Gold Loan">Instant Gold Loan</option>
                  <option value="Business Loan">MSME Business Working Capital</option>
                  <option value="Personal Loan">Personal Credit</option>
                  <option value="Loan Against Property">Loan Against Property (LAP)</option>
                  <option value="Refinancing / Balance Transfer">Loan Refinancing / Balance Transfer</option>
                  <option value="Vehicle & Equipment Credit">Vehicle & Farm Machinery Credit</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Requested Amount</label>
                <select
                  value={formData.requestedAmount}
                  onChange={(e) => setFormData({ ...formData, requestedAmount: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                >
                  <option value="Under ₹1,00,000">Under ₹1 Lakh</option>
                  <option value="₹1,00,000 – ₹5,00,000">₹1 Lakh – ₹5 Lakhs</option>
                  <option value="₹5,00,000 – ₹20,00,000">₹5 Lakhs – ₹20 Lakhs</option>
                  <option value="Above ₹20,00,000">Above ₹20 Lakhs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Message / Requirements</label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention any specific terms or timeline requirements..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!formData.name || formData.mobile.length < 10}
              className="w-full py-3.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-xs disabled:opacity-50 mt-1 transition-colors"
            >
              Submit Loan Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
