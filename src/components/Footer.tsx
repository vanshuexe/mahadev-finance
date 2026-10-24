import React from 'react';
import { Phone, MessageCircle, MapPin, Landmark, BookOpen, Instagram } from 'lucide-react';
import { dbService } from '../services/db';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const settings = dbService.getSettings();

  return (
    <footer className="bg-[#0b132b] text-slate-300 border-t border-slate-800">
      
      {/* 3 Pillars Summary Strip */}
      <div className="border-b border-slate-800/80 bg-[#070d1e] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#0f1d38] border border-slate-700/60 flex items-start gap-4">
            <div className="w-11 h-11 rounded-full border border-blue-400/40 text-blue-400 flex items-center justify-center shrink-0 font-bold text-base bg-[#024089]/30">
              ₹
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm">Mahadev Finance</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instant Gold Loans at 0.79% p.m., MSME credit lines, electronic carat purity testing & certified bank vaults in Jodhpur.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f1d38] border border-slate-700/60 flex items-start gap-4">
            <div className="w-11 h-11 rounded-full border border-blue-400/40 text-blue-400 flex items-center justify-center shrink-0 bg-[#024089]/30">
              <Landmark className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm">DC Property Vala</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Commercial leasing for SBI, PNB, BOB, highway showrooms & 100% verified plots in Jodhpur.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f1d38] border border-slate-700/60 flex items-start gap-4">
            <div className="w-11 h-11 rounded-full border border-blue-400/40 text-blue-400 flex items-center justify-center shrink-0 bg-[#024089]/30">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm">Academic Libraries</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Soundproof Saraswati Girls & Mahadev Boys study halls with 300 Mbps Wi-Fi & biometric security in Jodhpur.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand & Direct Contact */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-blue-400/40 bg-white p-0.5 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <img
                src="https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg"
                alt="Mahadev Group"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight">
                MAHADEV GROUP
              </h2>
              <span className="text-[10px] text-blue-300 uppercase font-medium">
                Jodhpur, Rajasthan
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            Trusted enterprise partner in gold finance, commercial real estate & disciplined study environments across Jodhpur.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-xs text-slate-200 hover:text-blue-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{settings.phone} / {settings.phoneSecondary}</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-[11px] text-amber-300 font-semibold">Executive Direct:</span>
              <a href={`tel:${settings.phoneExecutive.replace(/\s+/g, '')}`} className="text-slate-200 hover:text-amber-300">
                {settings.phoneExecutive}
              </a>
            </div>
            <a
              href={`https://wa.me/${settings.whatsapp}?text=Namaste%20Mahadev%20Group,%20I%20have%20an%20enquiry.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-slate-200 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {settings.phone}</span>
            </a>
            {/* Instagram Channels */}
            <div className="pt-2 flex flex-col gap-1.5 border-t border-slate-800/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Official Instagram:</span>
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-pink-300 hover:text-pink-100 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>@dcpropertyvala_jodhpur <span className="text-slate-400 text-[10px]">(Property)</span></span>
                </a>
              )}
              {settings.instagramFinanceUrl && (
                <a
                  href={settings.instagramFinanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-amber-300 hover:text-amber-100 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>@mahadev_finance_jodhpur93 <span className="text-slate-400 text-[10px]">(Finance)</span></span>
                </a>
              )}
              {settings.instagramPersonalUrl && (
                <a
                  href={settings.instagramPersonalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-purple-300 hover:text-purple-100 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>@ekshivbhaktt___ <span className="text-slate-400 text-[10px]">(Personal)</span></span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 3 Jodhpur Branch Addresses & Direct Lines */}
        <div>
          <h3 className="text-white font-bold mb-3 text-xs uppercase tracking-wider border-b border-slate-700/80 pb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Jodhpur Branches & Numbers</span>
          </h3>
          <ul className="text-xs flex flex-col gap-3.5 text-slate-300">
            <li className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-bold block text-[11px]">1. Jalori Gate (Head Office)</span>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-[11px] text-blue-400 hover:underline font-mono">
                  {settings.phone}
                </a>
              </div>
              <p className="text-slate-400 leading-snug">
                93, Himmat Jai Motor Vali Gali, Near SBI Bank, Jalori Gate, Jodhpur
              </p>
            </li>
            <li className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-bold block text-[11px]">2. Kudi Sector 5 Branch</span>
                <a href={`tel:${settings.phoneSecondary.replace(/\s+/g, '')}`} className="text-[11px] text-blue-400 hover:underline font-mono">
                  {settings.phoneSecondary}
                </a>
              </div>
              <p className="text-slate-400 leading-snug">
                5-G-21, Danga Tower, Kudi 5 Sector, Jodhpur
              </p>
            </li>
            <li className="space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-blue-300 font-bold block text-[11px]">3. Saraswati Nagar Branch</span>
                <a href={`tel:${settings.phoneTertiary.replace(/\s+/g, '')}`} className="text-[11px] text-blue-400 hover:underline font-mono">
                  {settings.phoneTertiary}
                </a>
              </div>
              <p className="text-slate-400 leading-snug">
                Veer Tejaji Tower, Ramdev Chowk, Saraswati Nagar, Jodhpur
              </p>
            </li>
          </ul>
        </div>

        {/* Division Services */}
        <nav aria-label="Enterprise Divisions">
          <h3 className="text-white font-bold mb-3 text-xs uppercase tracking-wider border-b border-slate-700/80 pb-1.5">
            Divisions & Services
          </h3>
          <ul className="text-xs flex flex-col gap-2 text-slate-300">
            <li>
              <button onClick={() => onNavigate('loans')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                Instant Gold Loans (0.79% p.m.)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('loans')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                MSME Business Working Capital
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('property')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                DC Property Vala Listings
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('rental')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                Commercial Bank Leases (SBI / PNB)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('library')} className="hover:text-blue-400 transition-colors text-left cursor-pointer">
                Saraswati Girls & Mahadev Boys Library
              </button>
            </li>
          </ul>
        </nav>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h3 className="text-white font-bold mb-3 text-xs uppercase tracking-wider border-b border-slate-700/80 pb-1.5">
            Quick Navigation
          </h3>
          <ul className="text-xs flex flex-col gap-2 text-slate-300">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors cursor-pointer">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors cursor-pointer">
                Institutional Heritage
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors cursor-pointer">
                All 3 Jodhpur Desks
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Officer Portal
              </button>
            </li>
          </ul>
        </nav>

      </div>

      <div
        className="border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-400 font-sans"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="Mahadev Group Jodhpur" />
        <meta itemProp="url" content="https://mahadevinvestorjodhpur.com/" />
        <meta itemProp="telephone" content="+91-7728894293" />
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
          <span itemProp="streetAddress">Jalori Gate</span>,
          <span itemProp="addressLocality">Jodhpur</span>,
          <span itemProp="addressRegion">Rajasthan</span>,
          <span itemProp="postalCode">342001</span>,
          <span itemProp="addressCountry">IN</span>
        </span>
        © {new Date().getFullYear()} Mahadev Group of Enterprises · Jodhpur, Rajasthan. All Rights Reserved.
        <span className="block mt-1 text-slate-600">
          <a href="https://mahadevinvestorjodhpur.com/sitemap.xml" className="hover:text-slate-400 transition-colors" target="_blank" rel="noopener">Sitemap</a>
          {' · '}
          <a href="https://mahadevinvestorjodhpur.com/robots.txt" className="hover:text-slate-400 transition-colors" target="_blank" rel="noopener">Robots</a>
        </span>
        <div className="max-w-4xl mx-auto mt-4 pt-4 border-t border-slate-800/80 text-left">
          <h4 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
            Project Completion and Handover
          </h4>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Development is scheduled to conclude on 24 October 2026. After development is complete, the developer will hand over all project files and the project database to Mahadev finance account. From the date the handover is completed, the client is responsible for operating, maintaining, securing, and managing the website and its content, accounts, and transactions. To the extent permitted by applicable law and subject to any written agreement, the developer is not responsible for fraud, unlawful activity, or other actions arising from the client's or other users' use of the website after handover. This statement does not exclude liability that cannot legally be excluded.
          </p>
        </div>
      </div>
    </footer>
  );
};
