import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogImage?: string;
  pageType?: 'home' | 'loans' | 'property' | 'library' | 'about' | 'contact' | 'rental' | 'other';
}

// Page-level SEO configurations for each route
export const PAGE_SEO: Record<string, SEOConfig> = {
  home: {
    title: 'Mahadev Finance Jodhpur | Gold Loan 0.79% | Commercial Property | Study Library – Mahadev Investor Jodhpur',
    description:
      'Mahadev Group Jodhpur – Instant Gold Loan at 0.79% p.m. with 15-min cash disbursal at Jalori Gate. DC Property Vala bank-ready commercial spaces. 24x7 AC Saraswati & Mahadev Study Libraries. 3 branches: Jalori Gate, Kudi Sector 5, Saraswati Nagar.',
    keywords:
      'mahadev finance jodhpur, gold loan jodhpur, gold loan jalori gate, mahadev investor jodhpur, mahadevinvestorjodhpur, commercial property jodhpur, study library jodhpur 24x7, instant gold loan jodhpur 0.79 percent, DC property vala jodhpur',
    canonical: 'https://mahadevinvestorjodhpur.com/',
    ogImage: 'https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg',
    pageType: 'home',
  },

  loans: {
    title: 'Gold Loan Jodhpur at 0.79% | Instant 15-Min Disbursal | Business Loan | Mahadev Finance Jalori Gate',
    description:
      'Get instant gold loan in Jodhpur at just 0.79% per month. Walk-in to Mahadev Finance Jalori Gate and get cash in 15 minutes. Also offering Business Loans, MSME Loans, Personal Loans & Property Loans. Call: 7728894293.',
    keywords:
      'gold loan jodhpur 0.79 percent, gold loan jalori gate jodhpur, instant gold loan jodhpur, gold loan low interest rajasthan, business loan jodhpur, MSME loan jodhpur rajasthan, personal loan jodhpur, sone par loan jodhpur, gold loan near me jodhpur, mahadev finance loan jodhpur',
    canonical: 'https://mahadevinvestorjodhpur.com/#/loans',
    ogImage: 'https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg',
    pageType: 'loans',
  },

  'loan-services': {
    title: 'Gold Loan Jodhpur at 0.79% | Instant 15-Min Disbursal | Business Loan | Mahadev Finance Jalori Gate',
    description:
      'Get instant gold loan in Jodhpur at just 0.79% per month. Walk-in to Mahadev Finance Jalori Gate and get cash in 15 minutes. Also offering Business Loans, MSME Loans, Personal Loans & Property Loans. Call: 7728894293.',
    keywords:
      'gold loan jodhpur 0.79 percent, gold loan jalori gate jodhpur, instant gold loan jodhpur, gold loan low interest rajasthan, business loan jodhpur, MSME loan jodhpur rajasthan, personal loan jodhpur',
    canonical: 'https://mahadevinvestorjodhpur.com/#/loans',
    pageType: 'loans',
  },

  property: {
    title: 'Commercial Property Jodhpur for Banks | DC Property Vala | SBI PNB BOB Branch Spaces | NH-48 Plots',
    description:
      'DC Property Vala Jodhpur specializes in bank-ready commercial spaces for SBI, PNB, BOB branches. Also offering NH-48 highway plots, RIICO approved industrial plots & retail spaces in Jodhpur, Rajasthan. Call: 9461333365.',
    keywords:
      'commercial property jodhpur, bank ready property jodhpur, SBI branch property jodhpur, PNB branch space jodhpur, BOB property jodhpur, NH-48 plot jodhpur, RIICO plot jodhpur, DC property vala, commercial space for rent jodhpur, property for bank jodhpur, kudi bhagasani road commercial property',
    canonical: 'https://mahadevinvestorjodhpur.com/#/property',
    ogImage: 'https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg',
    pageType: 'property',
  },

  'property-services': {
    title: 'Commercial Property Jodhpur for Banks | DC Property Vala | SBI PNB BOB Branch Spaces | NH-48 Plots',
    description:
      'DC Property Vala Jodhpur specializes in bank-ready commercial spaces for SBI, PNB, BOB branches. NH-48 highway plots, RIICO approved industrial plots & retail spaces in Jodhpur, Rajasthan.',
    keywords:
      'commercial property jodhpur, bank ready property jodhpur, SBI branch property jodhpur, DC property vala jodhpur, NH-48 plot jodhpur',
    canonical: 'https://mahadevinvestorjodhpur.com/#/property',
    pageType: 'property',
  },

  rental: {
    title: 'Commercial Property on Rent Jodhpur | Bank Spaces for Lease | DC Property Vala Rentals',
    description:
      'Premium commercial properties available for rent in Jodhpur. Bank-branch-ready ground floor shells, retail shops, and office spaces on long-term lease. Ideal for SBI, PNB, BOB & HDFC. Contact DC Property Vala today.',
    keywords:
      'commercial property on rent jodhpur, shop on rent jodhpur, office on rent jodhpur, bank space on rent jodhpur, ground floor commercial rent jodhpur, property for lease jodhpur rajasthan',
    canonical: 'https://mahadevinvestorjodhpur.com/#/rental',
    pageType: 'rental',
  },

  'rental-services': {
    title: 'Commercial Property on Rent Jodhpur | Bank Spaces for Lease | DC Property Vala Rentals',
    description:
      'Premium commercial properties available for rent in Jodhpur. Bank-branch-ready ground floor shells, retail shops, and office spaces on long-term lease.',
    keywords:
      'commercial property on rent jodhpur, shop on rent jodhpur, office on rent jodhpur, bank space on rent jodhpur',
    canonical: 'https://mahadevinvestorjodhpur.com/#/rental',
    pageType: 'rental',
  },

  library: {
    title: 'Study Library Jodhpur 24x7 | Saraswati Girls Library | Mahadev Boys Library | AC Soundproof Cubicles',
    description:
      'Best study library in Jodhpur open 24x7. Saraswati Girls Library & Mahadev Boys Library at Saraswati Nagar. AC soundproof cubicles, 300 Mbps Wi-Fi, biometric access, dedicated female warden. Ideal for UPSC, RAS, Bank, SSC, REET exam preparation.',
    keywords:
      'study library jodhpur, 24x7 library jodhpur, library for girls jodhpur, saraswati library jodhpur saraswati nagar, mahadev library jodhpur, library near me jodhpur, UPSC library jodhpur, RAS exam library jodhpur, library seat booking jodhpur, AC library jodhpur, soundproof study hall jodhpur',
    canonical: 'https://mahadevinvestorjodhpur.com/#/library',
    ogImage: 'https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-27%20at%206.19.21%20PM.jpeg',
    pageType: 'library',
  },

  'library-services': {
    title: 'Study Library Jodhpur 24x7 | Saraswati Girls Library | Mahadev Boys Library | AC Soundproof Cubicles',
    description:
      'Best study library in Jodhpur open 24x7. Saraswati Girls Library & Mahadev Boys Library at Saraswati Nagar. AC soundproof cubicles, 300 Mbps Wi-Fi, biometric access.',
    keywords:
      'study library jodhpur, 24x7 library jodhpur, library for girls jodhpur, saraswati library jodhpur, mahadev library jodhpur',
    canonical: 'https://mahadevinvestorjodhpur.com/#/library',
    pageType: 'library',
  },

  about: {
    title: 'About Mahadev Group Jodhpur | 15+ Years Trusted Finance & Property Company in Rajasthan',
    description:
      'Know more about Mahadev Group Jodhpur – 15+ years of institutional trust. Established leaders in gold loans, commercial real estate, and academic library infrastructure across Jodhpur, Rajasthan. Jalori Gate, Kudi Sector 5, Saraswati Nagar.',
    keywords:
      'about mahadev group jodhpur, mahadev finance history, mahadev investor jodhpur about, DC property vala jodhpur about, company profile jodhpur finance, mahadev finance jodhpur 15 years, trusted finance company jodhpur rajasthan',
    canonical: 'https://mahadevinvestorjodhpur.com/#/about',
    pageType: 'about',
  },

  'about-us': {
    title: 'About Mahadev Group Jodhpur | 15+ Years Trusted Finance & Property Company in Rajasthan',
    description:
      '15+ years of institutional trust. Gold loans, commercial real estate, and 24x7 academic libraries across Jodhpur. Jalori Gate, Kudi Sector 5, Saraswati Nagar.',
    keywords:
      'about mahadev group jodhpur, mahadev finance history, trusted finance company jodhpur rajasthan',
    canonical: 'https://mahadevinvestorjodhpur.com/#/about',
    pageType: 'about',
  },

  contact: {
    title: 'Contact Mahadev Group Jodhpur | 3 Branches: Jalori Gate, Kudi Sector 5, Saraswati Nagar | Call 7728894293',
    description:
      'Contact Mahadev Group Jodhpur. Head Office: Jalori Gate (Gold Loan & Finance). Kudi Sector 5 (Property). Saraswati Nagar (Library). Call 7728894293 or 9413792922. Open Mon–Sat 9AM–7PM. WhatsApp available.',
    keywords:
      'mahadev finance jodhpur contact, mahadev investor jodhpur phone number, jalori gate gold loan contact, DC property vala contact, library jodhpur contact, mahadev group address jodhpur, how to reach mahadev finance',
    canonical: 'https://mahadevinvestorjodhpur.com/#/contact',
    pageType: 'contact',
  },

  'contact-us': {
    title: 'Contact Mahadev Group Jodhpur | 3 Branches: Jalori Gate, Kudi Sector 5, Saraswati Nagar | Call 7728894293',
    description:
      'Contact Mahadev Group Jodhpur. 3 branches in Jodhpur. Call 7728894293 or WhatsApp for instant assistance. Gold Loans, Property & Library.',
    keywords:
      'mahadev finance jodhpur contact, jalori gate gold loan contact, DC property vala contact',
    canonical: 'https://mahadevinvestorjodhpur.com/#/contact',
    pageType: 'contact',
  },

  'other-services': {
    title: 'Other Services | Insurance, Investment & Financial Advisory | Mahadev Group Jodhpur',
    description:
      'Mahadev Group Jodhpur offers additional financial services including investment advisory, insurance planning, and other credit solutions for businesses and individuals in Jodhpur, Rajasthan.',
    keywords:
      'financial services jodhpur, investment advisory jodhpur, insurance jodhpur, mahadev group other services, financial advisory jodhpur rajasthan',
    canonical: 'https://mahadevinvestorjodhpur.com/#/other-services',
    pageType: 'other',
  },
};

/**
 * useSEO – dynamically updates document <title>, meta description,
 * meta keywords, canonical link, and Open Graph tags per page.
 */
export function useSEO(path: string) {
  useEffect(() => {
    const config = PAGE_SEO[path] || PAGE_SEO['home'];

    // Update <title>
    document.title = config.title;

    // Helper to upsert a meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const parts = selector.match(/\[([^\]]+)="([^"]+)"\]/);
        if (parts) el.setAttribute(parts[1], parts[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Helper to upsert a link tag
    const setLink = (rel: string, value: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', value);
    };

    // Primary meta
    setMeta('meta[name="description"]', 'content', config.description);
    setMeta('meta[name="keywords"]', 'content', config.keywords);

    // Canonical
    if (config.canonical) {
      setLink('canonical', config.canonical);
    }

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', config.title);
    setMeta('meta[property="og:description"]', 'content', config.description);
    setMeta('meta[property="og:url"]', 'content', config.canonical || `https://mahadevinvestorjodhpur.com/#/${path}`);
    if (config.ogImage) {
      setMeta('meta[property="og:image"]', 'content', config.ogImage);
    }

    // Twitter
    setMeta('meta[name="twitter:title"]', 'content', config.title);
    setMeta('meta[name="twitter:description"]', 'content', config.description);
    if (config.ogImage) {
      setMeta('meta[name="twitter:image"]', 'content', config.ogImage);
    }
  }, [path]);
}
