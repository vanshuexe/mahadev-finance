import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calculator,
  Lock,
  Landmark,
  BadgeCheck,
  Percent,
  Sparkles
} from 'lucide-react';
import { dbService } from '../services/db';

interface LoansPageProps {
  onOpenGoldLoanModal: () => void;
  onOpenGeneralLoanModal: (loanType?: string) => void;
}

export const LoansPage: React.FC<LoansPageProps> = ({
  onOpenGoldLoanModal,
  onOpenGeneralLoanModal
}) => {
  const loans = dbService.getLoans().filter((l) => l.active);
  const cms = dbService.getContent().loans || {};
  const header = cms.header || {};
  const goldLoanCms = cms.goldLoan || {};

  // Calculator Mode
  const [calcMode, setCalcMode] = useState<'gold' | 'emi'>('gold');

  // Gold Calculator State
  const [goldWeightGrams, setGoldWeightGrams] = useState<number>(40);
  const goldRatePerGram = parseFloat(goldLoanCms.ratePerGram?.value || '5600');
  const goldInterestRate = parseFloat(goldLoanCms.interestRate?.value || '0.79') / 100;
  const goldDisbursalCash = Math.round(goldWeightGrams * goldRatePerGram);
  const goldMonthlyInterest = Math.round(goldDisbursalCash * goldInterestRate);

  // EMI Calculator State
  const [emiAmount, setEmiAmount] = useState<number>(300000);
  const [emiInterest, setEmiInterest] = useState<number>(10.5);
  const [emiTenureMonths, setEmiTenureMonths] = useState<number>(24);

  const calculateMonthlyEmi = () => {
    const p = emiAmount;
    const r = emiInterest / 12 / 100;
    const n = emiTenureMonths;
    if (r === 0) return Math.round(p / n);
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const calculatedEmi = calculateMonthlyEmi();

  return (
    <div className="w-full bg-slate-50 text-slate-800 min-h-screen pb-20">

      {/* SEO: Primary H1 for gold loan page */}
      <h1 className="sr-only">
        Gold Loan Jodhpur at 0.79% Per Month – Instant 15-Minute Cash Disbursal | Business Loan | MSME Loan | Mahadev Finance Jalori Gate Jodhpur Rajasthan
      </h1>

      {/* 1. HERO HEADER - Clean Corporate */}
      <section className="relative pt-24 pb-12 px-4 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <span>{header.badge?.value || 'Mahadev Finance · Jodhpur Credit Desk'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {header.title?.value || 'Transparent Capital. 15-Minute Disbursal.'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {header.subtitle?.value || 'Instant cash against gold jewellery, MSME lines of credit, and property-backed loans with bank-grade vault custody across 3 branches in Jodhpur.'}
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE LIVE LOAN CALCULATOR CONSOLE */}
      <section className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
          
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCalcMode('gold')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  calcMode === 'gold'
                    ? 'bg-[#024089] text-white shadow-xs font-bold'
                    : 'text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200'
                }`}
              >
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Instant Gold Loan Estimator</span>
              </button>

              <button
                type="button"
                onClick={() => setCalcMode('emi')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  calcMode === 'emi'
                    ? 'bg-[#024089] text-white shadow-xs font-bold'
                    : 'text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200'
                }`}
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Business / MSME EMI Calculator</span>
              </button>
            </div>

            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {calcMode === 'gold' ? '0.79% /mo Rate' : 'Flexible 6–60 Months'}
            </span>
          </div>

          {calcMode === 'gold' ? (
            /* GOLD CALCULATOR */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-semibold">Gold Ornament Weight</span>
                  <span className="font-mono text-[#024089] font-bold text-sm bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {goldWeightGrams} Grams
                  </span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={250}
                  step={5}
                  value={goldWeightGrams}
                  onChange={(e) => setGoldWeightGrams(Number(e.target.value))}
                  className="w-full accent-[#024089] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>10g (~₹56,000)</span>
                  <span>125g (~₹7,00,000)</span>
                  <span>250g (~₹14,00,000)</span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Disbursal Amount</span>
                    <strong className="text-2xl font-bold font-mono text-[#024089]">
                      ₹{goldDisbursalCash.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Monthly Interest</span>
                    <strong className="text-base font-bold font-mono text-emerald-600">
                      ₹{goldMonthlyInterest.toLocaleString('en-IN')}/mo
                    </strong>
                  </div>
                </div>

                <button
                  onClick={onOpenGoldLoanModal}
                  className="w-full bg-[#024089] hover:bg-[#012d61] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Apply for ₹{goldDisbursalCash.toLocaleString('en-IN')} Cash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* EMI CALCULATOR */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-semibold">Loan Amount</span>
                    <span className="font-mono text-[#024089] font-bold text-sm bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      ₹{emiAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={2500000}
                    step={25000}
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(Number(e.target.value))}
                    className="w-full accent-[#024089] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 font-semibold">Interest Rate</span>
                      <span className="font-mono text-[#024089] font-bold">{emiInterest}%</span>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={20}
                      step={0.5}
                      value={emiInterest}
                      onChange={(e) => setEmiInterest(Number(e.target.value))}
                      className="w-full accent-[#024089] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-700 font-semibold">Tenure</span>
                      <span className="font-mono text-[#024089] font-bold">{emiTenureMonths} Mo</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={60}
                      step={6}
                      value={emiTenureMonths}
                      onChange={(e) => setEmiTenureMonths(Number(e.target.value))}
                      className="w-full accent-[#024089] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Monthly EMI</span>
                  <strong className="text-2xl font-bold font-mono text-[#024089]">
                    ₹{calculatedEmi.toLocaleString('en-IN')} /mo
                  </strong>
                  <span className="text-xs text-slate-500 font-mono block mt-1">
                    Total Repayment: ₹{(calculatedEmi * emiTenureMonths).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenGeneralLoanModal('Business Loan')}
                  className="w-full bg-[#024089] hover:bg-[#012d61] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Apply Business Credit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 3. LOAN PROGRAMS - Clean Matrix */}
      <section className="max-w-6xl mx-auto px-4 pt-16 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
              Credit Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Structured Loan Programs
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Zero Pre-payment Penalties · Direct Processing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="card-clean p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">{loan.name}</h3>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 shrink-0">
                    {loan.interestRate}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Ticket</span>
                    <strong className="text-slate-900">{loan.loanRange}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Tenure</span>
                    <strong className="text-slate-900">{loan.tenure}</strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  {loan.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (loan.slug.includes('gold')) {
                    onOpenGoldLoanModal();
                  } else {
                    onOpenGeneralLoanModal(loan.name);
                  }
                }}
                className="w-full py-2.5 bg-[#024089] hover:bg-[#012d61] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer text-center shadow-xs"
              >
                Apply for {loan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3-STEP DISBURSAL WORKFLOW */}
      <section className="max-w-4xl mx-auto px-4 pt-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Fast Track Desk
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2">How Disbursal Works in 3 Steps</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-left">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#024089] text-white font-mono font-bold flex items-center justify-center text-xs">
                1
              </span>
              <h4 className="font-bold text-slate-900">Instant Appraisal</h4>
              <p className="text-slate-600 text-xs">Precision touchstone purity appraisal conducted in front of you.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#024089] text-white font-mono font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h4 className="font-bold text-slate-900">Aadhaar / PAN KYC</h4>
              <p className="text-slate-600 text-xs">Paperless digital KYC verification in under 3 minutes.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#024089] text-white font-mono font-bold flex items-center justify-center text-xs">
                3
              </span>
              <h4 className="font-bold text-slate-900">Cash / NEFT Payout</h4>
              <p className="text-slate-600 text-xs">Walk out with direct cash or instant bank account transfer.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-bold text-slate-900">Jalori Gate Gold Desk:</span>
              <a href="tel:7728894293" className="font-bold text-[#024089] hover:underline">+91 77288 94293</a>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">Executive Line:</span>
              <a href="tel:9413792922" className="font-bold text-slate-700 hover:underline">+91 94137 92922</a>
            </div>
            <a
              href="https://wa.me/917728894293?text=Namaste%20Mahadev%20Group,%20I%20need%20gold%20loan%20valuation%20assistance."
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 font-bold hover:underline"
            >
              Chat on WhatsApp (7728894293) →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
