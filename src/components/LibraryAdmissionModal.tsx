import React, { useState } from 'react';
import { X, CheckCircle2, BookOpen, ShieldCheck, Clock, Award } from 'lucide-react';
import { dbService } from '../services/db';

interface LibraryAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWing?: 'Saraswati Girls Library' | 'Mahadev Boys Library';
}

export const LibraryAdmissionModal: React.FC<LibraryAdmissionModalProps> = ({
  isOpen,
  onClose,
  defaultWing = 'Saraswati Girls Library'
}) => {
  const libConfig = dbService.getLibraryConfig();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    wing: defaultWing,
    shift: 'Full Day (8 AM - 8 PM) · ₹1,200/mo',
    examPreparation: 'UPSC / RAS / State PSC',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.mobile.length < 10) return;

    const record = dbService.addApplication(
      'library-admission',
      'Library',
      `Library Admission: ${formData.wing} (${formData.shift})`,
      formData.name,
      formData.mobile,
      'Jodhpur (Saraswati Nagar)',
      {
        wing: formData.wing,
        shift: formData.shift,
        examPreparation: formData.examPreparation,
        message: formData.message || 'Direct trial desk reservation.'
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
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
                Library Admission & 1-Day Trial
              </h3>
              <p className="text-[11px] text-blue-700 font-semibold">
                Saraswati Girls & Mahadev Boys Wings · Saraswati Nagar, Jodhpur
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
              <h4 className="font-extrabold text-lg text-slate-900">Trial Desk Reserved Successfully</h4>
              <p className="text-slate-600">
                Welcome, <strong className="text-slate-900">{formData.name}</strong>. Pass ID:{' '}
                <span className="font-mono font-bold text-[#024089] bg-blue-50 px-2 py-0.5 border border-blue-200 rounded">{appId}</span>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2">
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-1.5 font-medium">
                <span>Branch Wing:</span>
                <strong className="text-slate-900">{formData.wing}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-1.5 font-medium">
                <span>Shift Selected:</span>
                <strong className="text-[#024089]">{formData.shift}</strong>
              </div>
              <p className="text-slate-600 pt-1 leading-relaxed text-xs">
                Please present this ID or your registered mobile <strong className="text-[#024089] font-mono">{formData.mobile}</strong> at the reception desk to claim your free study desk.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Collect Trial Pass & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Candidate Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Student Name"
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
                <label className="font-semibold text-slate-700 block mb-1">Select Branch Wing</label>
                <select
                  value={formData.wing}
                  onChange={(e) => setFormData({ ...formData, wing: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                >
                  <option value="Saraswati Girls Library">Saraswati Girls Wing (Female Warden)</option>
                  <option value="Mahadev Boys Library">Mahadev Boys Wing (24x7 AC)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Shift & Timings</label>
                <select
                  value={formData.shift}
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
                >
                  <option value="Full Day (8 AM - 8 PM) · ₹1,200/mo">Full Day (8 AM - 8 PM) · ₹1,200/mo</option>
                  <option value="Morning Shift (8 AM - 2 PM) · ₹700/mo">Morning Shift (8 AM - 2 PM) · ₹700/mo</option>
                  <option value="Evening Shift (2 PM - 8 PM) · ₹700/mo">Evening Shift (2 PM - 8 PM) · ₹700/mo</option>
                  <option value="Night Owl (8 PM - 6 AM) · ₹900/mo">Night Shift (8 PM - 6 AM) · ₹900/mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Competitive Exam / Target Goal</label>
              <input
                type="text"
                value={formData.examPreparation}
                onChange={(e) => setFormData({ ...formData, examPreparation: e.target.value })}
                placeholder="e.g. UPSC, RAS, NEET, SSC, Banking, CA..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#024089] focus:bg-white outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!formData.name || formData.mobile.length < 10}
              className="w-full py-3.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-xs disabled:opacity-50 mt-1 transition-colors"
            >
              Reserve Free 1-Day Trial Desk Pass
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
