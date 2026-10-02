// Real-time Persistent Database Engine for Mahadev Finance, DC Property Vala & Library System
// Supports full CRUD, reactive subscriptions, Admin state management, and CSV export.

export interface ApplicationNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export type ApplicationType =
  | 'gold-loan-enquiry'
  | 'general-loan-enquiry'
  | 'loan-application'
  | 'loan-renewal-enquiry'
  | 'property-enquiry'
  | 'property-listing-request'
  | 'rental-enquiry'
  | 'library-admission'
  | 'library-enquiry'
  | 'contact-us';

export type ApplicationCategory = 'Finance' | 'Property' | 'Rental' | 'Library' | 'General';

export type ApplicationStatus = 'New' | 'In Review' | 'Follow-up' | 'Approved' | 'Closed' | 'Rejected';

export interface ApplicationRecord {
  id: string;
  type: ApplicationType;
  category: ApplicationCategory;
  title: string;
  customerName: string;
  mobile: string;
  city: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  details: Record<string, any>;
  notes: ApplicationNote[];
}

export interface LoanCategoryItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  interestRate: string;
  loanRange: string;
  tenure: string;
  eligibility: string[];
  documents: string[];
  features: string[];
  active: boolean;
}

export interface PropertyListingItem {
  id: string;
  title: string;
  type: 'Residential' | 'Commercial' | 'Plot' | 'Shop' | 'House' | 'Building' | 'Flat';
  purpose: 'Buy' | 'Sell' | 'Rent';
  location: string;
  price: string;
  area: string;
  suitableForBank?: boolean;
  features: string[];
  status: 'Available' | 'Booked' | 'Sold/Rented';
  contactPerson: string;
  phone: string;
  images?: string[];
  bedrooms?: string;
  furnished?: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished' | 'Bank Ready Shell';
  verified?: boolean;
}

export interface LibraryShift {
  id: string;
  name: string;
  timings: string;
  monthlyFee: number;
  description: string;
}

export interface LibraryConfig {
  girlsLibrary: {
    name: string;
    totalSeats: number;
    occupiedSeats: number;
    features: string[];
    specialSecurity: string;
  };
  boysLibrary: {
    name: string;
    totalSeats: number;
    occupiedSeats: number;
    features: string[];
  };
  shifts: LibraryShift[];
  announcement: string;
  rules: string[];
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  landmark: string;
  area: string;
  city: string;
  pincode: string;
  phone?: string;
  altPhone?: string;
  tag: string;
  googleMapsQuery: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  phone: string;
  phoneSecondary: string;
  phoneTertiary: string;
  phoneExecutive: string;
  whatsapp: string;
  email: string;
  address: string;
  branches: BranchLocation[];
  googleMapsUrl: string;
  instagramUrl: string; // Primary Property: @dcpropertyvala_jodhpur
  instagramPersonalUrl?: string; // Founder Personal: @ekshivbhaktt___
  instagramFinanceUrl?: string; // Finance Desk: @mahadev_finance_jodhpur93
  adminPin: string;
  noticeBanner: string;
  founderImageUrl?: string;
  officeBannerUrl?: string;
}

export interface ContentField {
  label: string;
  value: string;
  type: 'text' | 'textarea' | 'image';
}

export type WebsiteContent = Record<string, Record<string, Record<string, ContentField>>>;

const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  home: {
    hero: {
      bgImage: { label: 'Hero Background Image', value: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=85', type: 'image' },
    },
    stats: {
      yearsNumber: { label: 'Years Number', value: '15+', type: 'text' },
      yearsText: { label: 'Years Text', value: 'Years of Institutional Trust', type: 'text' },
      yearsSubtext: { label: 'Years Subtext', value: 'Premier Finance, Commercial Real Estate and Academics in Jodhpur', type: 'textarea' },
      goldRate: { label: 'Gold Rate', value: '0.79%', type: 'text' },
      goldRateText: { label: 'Gold Rate Text', value: 'Gold Loan Rate p.m.', type: 'text' },
      propVerified: { label: 'Properties Verified', value: '100%', type: 'text' },
      propVerifiedText: { label: 'Properties Verified Text', value: 'Verified Property Titles', type: 'text' },
      libraryDesks: { label: 'Library Desks', value: '500+', type: 'text' },
      libraryDesksText: { label: 'Library Desks Text', value: 'Library Study Desks', type: 'text' },
    }
  },
  about: {
    hero: {
      title: { label: 'Hero Title', value: 'Institutional Trust and Regional Enterprise', type: 'text' },
      subtitle: { label: 'Hero Subtitle', value: '15+ years of transparent credit disbursal, commercial bank leasing, and dedicated academic infrastructure across Jodhpur.', type: 'textarea' },
      officeImage: { label: 'Office Image', value: 'https://ik.imagekit.io/fdhgiehjz/tt.jpeg', type: 'image' }
    },
    founder: {
      name: { label: 'Founder Name', value: 'Shri Dharmendra Choudhary Danga', type: 'text' },
      title: { label: 'Founder Title', value: 'Founder and Managing Director', type: 'text' },
      quote: { label: 'Founder Quote', value: 'Trust in finance and real estate is not built on promises. It is built on transparent touchstones, verified deed titles, and zero hidden costs.', type: 'textarea' },
      image: { label: 'Founder Image', value: 'https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-29%20at%207.56.02%20PM_nKmI33Jdg.jpeg', type: 'image' }
    },
    mission: {
      title: { label: 'Mission Section Title', value: 'Our Mission and Values', type: 'text' },
      description: { label: 'Mission Description', value: 'To be the most trusted financial and real estate partner in Rajasthan, providing transparent, efficient, and customer-first services.', type: 'textarea' },
    },
    stats: {
      clientsServed: { label: 'Clients Served', value: '10,000+', type: 'text' },
      clientsLabel: { label: 'Clients Label', value: 'Satisfied Clients', type: 'text' },
      loansDisbursed: { label: 'Loans Disbursed', value: '500 Cr+', type: 'text' },
      loansLabel: { label: 'Loans Label', value: 'Total Disbursed', type: 'text' },
      propertiesDone: { label: 'Properties Done', value: '200+', type: 'text' },
      propertiesLabel: { label: 'Properties Label', value: 'Property Transactions', type: 'text' },
      yearsLabel: { label: 'Years Label', value: '15+ Years', type: 'text' },
      yearsDesc: { label: 'Years Description', value: 'In Business', type: 'text' },
    }
  },
  loans: {
    header: {
      badge: { label: 'Top Badge Text', value: 'Mahadev Finance - Jodhpur Credit Desk', type: 'text' },
      title: { label: 'Page Title', value: 'Transparent Capital. 15-Minute Disbursal.', type: 'text' },
      subtitle: { label: 'Page Subtitle', value: 'Instant cash against gold jewellery, MSME lines of credit, and property-backed loans with bank-grade vault custody across 3 branches in Jodhpur.', type: 'textarea' },
    },
    goldLoan: {
      title: { label: 'Gold Loan Section Title', value: 'Gold Loan - Live Rate Calculator', type: 'text' },
      ratePerGram: { label: 'Gold Rate Per Gram (Rs)', value: '5600', type: 'text' },
      interestRate: { label: 'Monthly Interest Rate (%)', value: '0.79', type: 'text' },
    },
    whyChoose: {
      title: { label: 'Why Choose Us Title', value: 'Why Jodhpur Trusts Mahadev Finance', type: 'text' },
      point1: { label: 'Point 1', value: 'No hidden charges - final disbursal amount shown upfront', type: 'text' },
      point2: { label: 'Point 2', value: 'Bank-grade fireproof vault and 24x7 CCTV security', type: 'text' },
      point3: { label: 'Point 3', value: 'Karatometer purity testing in front of customer', type: 'text' },
      point4: { label: 'Point 4', value: 'Loan in 15 minutes - same day NEFT/RTGS transfer', type: 'text' },
    }
  },
  properties: {
    header: {
      badge: { label: 'Top Badge Text', value: 'DC Property Vala - Verified Regional Inventory', type: 'text' },
      title: { label: 'Page Title', value: 'Commercial and Bank-Ready Properties', type: 'text' },
      subtitle: { label: 'Page Subtitle', value: 'Verified properties, bank-approved showrooms, and clear-title plots across Jodhpur and NH-48 corridor.', type: 'textarea' },
    },
    trust: {
      title: { label: 'Trust Section Title', value: 'Why DC Property Vala?', type: 'text' },
      point1: { label: 'Trust Point 1', value: '100% clear title verification before listing', type: 'text' },
      point2: { label: 'Trust Point 2', value: 'Bank-approved and RERA-compliant properties', type: 'text' },
      point3: { label: 'Trust Point 3', value: 'Zero brokerage hidden charges', type: 'text' },
    },
    cta: {
      title: { label: 'CTA Section Title', value: 'Have a Property to List?', type: 'text' },
      description: { label: 'CTA Description', value: 'List your commercial or residential property with DC Property Vala for maximum exposure and verified buyer reach.', type: 'textarea' },
      buttonText: { label: 'CTA Button Text', value: 'List My Property Free', type: 'text' },
    }
  },
  library: {
    header: {
      badge: { label: 'Top Badge Text', value: 'Academic Infrastructure - Saraswati Nagar, Jodhpur', type: 'text' },
      title: { label: 'Page Title', value: 'Soundproof Study Libraries with Biometric Access', type: 'text' },
      subtitle: { label: 'Page Subtitle', value: 'Separate Saraswati Girls and Mahadev Boys wings, dedicated female warden, 300 Mbps fiber and 24/7 power backup at Veer Tejaji Tower, Ramdev Chowk, Saraswati Nagar, Jodhpur.', type: 'textarea' },
    },
    girlsWing: {
      name: { label: 'Girls Wing Name', value: 'Saraswati Girls Wing', type: 'text' },
      description: { label: 'Girls Wing Description', value: 'Exclusively for female students with dedicated lady warden, pink-coded entry biometric, and separate study bays.', type: 'textarea' },
      image: { label: 'Girls Wing Image', value: 'https://ik.imagekit.io/fdhgiehjz/tt.jpeg', type: 'image' },
    },
    boysWing: {
      name: { label: 'Boys Wing Name', value: 'Mahadev Boys Wing', type: 'text' },
      description: { label: 'Boys Wing Description', value: 'High-focus study hall for male students with ergonomic seating, dedicated power points, and 300 Mbps fiber access.', type: 'textarea' },
      image: { label: 'Boys Wing Image', value: 'https://ik.imagekit.io/fdhgiehjz/tt.jpeg', type: 'image' },
    },
    features: {
      feature1: { label: 'Feature 1', value: 'Biometric Entry and Attendance', type: 'text' },
      feature2: { label: 'Feature 2', value: '300 Mbps High-Speed WiFi', type: 'text' },
      feature3: { label: 'Feature 3', value: 'AC + Power Backup 24/7', type: 'text' },
      feature4: { label: 'Feature 4', value: 'CCTV Monitored Premises', type: 'text' },
      feature5: { label: 'Feature 5', value: 'Dedicated Female Warden', type: 'text' },
      feature6: { label: 'Feature 6', value: 'Printed Study Material Area', type: 'text' },
    },
    cta: {
      title: { label: 'CTA Title', value: 'Book Your Study Desk Today', type: 'text' },
      description: { label: 'CTA Description', value: 'Limited seats available. Biometric registration on first day. No caution deposit required.', type: 'textarea' },
    }
  },
  contact: {
    header: {
      badge: { label: 'Top Badge Text', value: 'Mahadev Group - Jodhpur', type: 'text' },
      title: { label: 'Page Title', value: 'Contact Mahadev Group', type: 'text' },
      subtitle: { label: 'Page Subtitle', value: 'Reach out to our Jodhpur central desk for finance, real estate, or library admissions.', type: 'textarea' },
    },
    formSection: {
      title: { label: 'Form Section Title', value: 'Send Us a Message', type: 'text' },
      description: { label: 'Form Description', value: 'Our team will contact you within 2 hours during business hours (9 AM - 8 PM).', type: 'textarea' },
    },
    officeHours: {
      title: { label: 'Office Hours Title', value: 'Office Hours', type: 'text' },
      weekdays: { label: 'Weekdays Hours', value: 'Monday - Saturday: 9:00 AM - 8:00 PM', type: 'text' },
      sunday: { label: 'Sunday Hours', value: 'Sunday: 10:00 AM - 4:00 PM', type: 'text' },
    }
  },
  rental: {
    header: {
      badge: { label: 'Top Badge Text', value: 'DC Property Vala - Rental Hub', type: 'text' },
      title: { label: 'Page Title', value: 'Commercial and Residential Rentals', type: 'text' },
      subtitle: { label: 'Page Subtitle', value: 'Find your ideal rental space - from bank-approved showrooms to furnished residences, all with verified titles and transparent pricing.', type: 'textarea' },
    },
    trust: {
      title: { label: 'Trust Section Title', value: 'Why Rent Through DC Property Vala?', type: 'text' },
      point1: { label: 'Trust Point 1', value: 'All rentals verified with clear title documentation', type: 'text' },
      point2: { label: 'Trust Point 2', value: 'Bank-leasing ready properties available', type: 'text' },
      point3: { label: 'Trust Point 3', value: 'Transparent rent agreement - no hidden charges', type: 'text' },
    }
  }
};

// Initial Seed Data
const INITIAL_LOANS: LoanCategoryItem[] = [
  {
    id: 'loan-gold',
    name: 'Gold Loan (Immediate Cash)',
    slug: 'gold-loan',
    shortDescription: 'Instant liquidity against your 18K-24K gold jewellery with lowest interest and same-day disbursal.',
    interestRate: 'From 0.79% per month (9.5% p.a.)',
    loanRange: '₹10,000 to ₹50,00,000+',
    tenure: '3 Months to 36 Months',
    eligibility: [
      'Age between 18 to 70 years',
      'Owner of gold jewellery / coins (18K to 24K purity)',
      'Valid KYC documents (Aadhaar & PAN card)',
      'No strict CIBIL score requirement'
    ],
    documents: [
      'Original Aadhaar Card & PAN Card',
      '2 Passport size photographs',
      'Gold jewellery for on-the-spot electronic purity appraisal',
      'Cancelled cheque / Bank passbook for instant NEFT/RTGS disbursal'
    ],
    features: [
      'Electronic digital karatometer purity testing in front of customer',
      'High per-gram loan valuation conforming to RBI guidelines',
      'Bank-grade fireproof safe & 24x7 CCTV monitored security vault',
      'Zero pre-payment penalty & flexible bullet / EMI interest options'
    ],
    active: true
  },
  {
    id: 'loan-gold-jewellery',
    name: 'Gold Loan Against Gold Jewellery',
    slug: 'gold-loan-against-jewellery',
    shortDescription: 'Specialized scheme for heavy wedding jewellery, temple ornaments, and heirloom gold with zero damage guarantee.',
    interestRate: 'From 0.85% per month (10.2% p.a.)',
    loanRange: '₹50,000 to ₹1,00,00,000',
    tenure: '6 Months to 48 Months',
    eligibility: [
      'Indian Resident aged 18+',
      'Jewellery owner with valid ID proof',
      'Gold ornaments of 20K to 24K hallmarked/traditional purity'
    ],
    documents: [
      'PAN Card & Aadhaar / Voter ID',
      'Address proof',
      'Bank details for instant transfer'
    ],
    features: [
      'Zero stone deduction on certified hallmarked ornaments',
      '100% insured safety sealed in tamper-evident security packets',
      'Over-the-counter gold release within 10 minutes upon repayment'
    ],
    active: true
  },
  {
    id: 'loan-business',
    name: 'Business Loan (MSME & Traders)',
    slug: 'business-loan',
    shortDescription: 'Collateral-free and secured working capital loans to fuel inventory, expansion, machinery purchase, or business growth.',
    interestRate: 'From 11.5% to 16% p.a.',
    loanRange: '₹1,00,000 to ₹75,00,000',
    tenure: '12 Months to 60 Months',
    eligibility: [
      'Business operational vintage of minimum 2 years',
      'Annual turnover of ₹15 Lakhs and above',
      'Proprietorship, Partnership, Pvt Ltd, or Retail Merchants',
      'Satisfactory banking and business conduct'
    ],
    documents: [
      'Last 12 months current bank statements',
      'GST returns for last 1 year & GST Registration Certificate',
      'PAN Card of Business and Promoters',
      'Last 2 years ITR with computation & Financials',
      'Business address proof / Rent agreement / Udyam Certificate'
    ],
    features: [
      'Minimal documentation with swift credit appraisal',
      'Customized repayment structure matching seasonal cash flows',
      'Overdraft & Term Loan options available'
    ],
    active: true
  },
  {
    id: 'loan-personal',
    name: 'Personal Loan (Salaried & Self-Employed)',
    slug: 'personal-loan',
    shortDescription: 'Unsecured urgent funding for medical emergencies, home renovation, weddings, or debt consolidation.',
    interestRate: 'From 10.75% to 15.5% p.a.',
    loanRange: '₹50,000 to ₹15,00,000',
    tenure: '12 Months to 60 Months',
    eligibility: [
      'Salaried individuals with min monthly salary ₹18,000',
      'Self-employed professionals with min 2 years business ITR',
      'Age between 21 to 58 years',
      'CIBIL score of 680+ preferred'
    ],
    documents: [
      'PAN Card & Aadhaar Card',
      'Last 3 months salary slips & 6 months bank statement',
      'Current employment ID / Business address proof',
      'Passport size photograph'
    ],
    features: [
      'Disbursal within 24 to 48 hours directly into bank account',
      'Transparent processing fee with no hidden surprise costs',
      'Flexible tenure options with easy auto-debit EMI'
    ],
    active: true
  },
  {
    id: 'loan-renewal',
    name: 'Loan Renewal & Interest Top-Up',
    slug: 'loan-renewal',
    shortDescription: 'Seamless renewal of running gold loans, interest rebates, or top-up cash against appreciated gold market rates.',
    interestRate: 'Special loyalty interest rates for existing customers',
    loanRange: 'Existing Loan + Top-up up to ₹25,00,000',
    tenure: 'Extended 3 to 24 Months',
    eligibility: [
      'Existing Mahadev Finance gold or business loan borrowers',
      'Clear interest servicing record or standard account status'
    ],
    documents: [
      'Original Mahadev Finance Loan Receipt / Pledge Card',
      'Customer ID / Registered Mobile verification OTP'
    ],
    features: [
      'Instant top-up if gold market price has increased since pledge',
      'Zero new valuation hassle or re-documentation stress',
      'Pay only interest and renew principal without breaking investment'
    ],
    active: true
  },
  {
    id: 'loan-other',
    name: 'Other Financial Services',
    slug: 'other-financial-services',
    shortDescription: 'Loan Against Property (LAP), Commercial Vehicle Re-financing, Machinery Finance & Financial Advisory.',
    interestRate: 'From 9.25% p.a.',
    loanRange: '₹5,00,000 to ₹3,00,00,000',
    tenure: 'Up to 15 Years',
    eligibility: [
      'Residential / Commercial / Industrial property owners',
      'Clear legal title and approved blueprint'
    ],
    documents: [
      'Registry papers / Title deeds',
      'Approved municipal plan',
      'Income tax returns and KYC'
    ],
    features: [
      'High LTV up to 70% of registered market value',
      'Expert doorstep documentation & legal clearance team'
    ],
    active: true
  }
];

const INITIAL_PROPERTIES: PropertyListingItem[] = [
  {
    id: 'PROP-01',
    title: 'Prime 3-Storey Commercial Building for Bank / Corporate',
    type: 'Building',
    purpose: 'Rent',
    location: 'Main Commercial Market Road, Near SBBJ/SBI Circle, Neemrana',
    price: '₹1,25,000 / month',
    area: '4,500 sq.ft (Ground + 2 Floors)',
    suitableForBank: true,
    verified: true,
    furnished: 'Bank Ready Shell',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Approved commercial blueprint suitable for Nationalized / Private Banks',
      'Ground floor 1,500 sq ft hall + strong room provision',
      'Three-phase 30 kW industrial electric meter & 100% DG backup space',
      'Wide 80-foot road frontage with ample 15+ car customer parking'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  },
  {
    id: 'PROP-02',
    title: 'High-Visibility Ground Floor Showroom Space',
    type: 'Shop',
    purpose: 'Rent',
    location: 'Opposite Central Plaza, Main Highway Boulevard, Behror',
    price: '₹65,000 / month',
    area: '1,850 sq.ft Carpet Area',
    suitableForBank: true,
    verified: true,
    furnished: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Ultra-wide glass frontage of 32 feet',
      'Ideal for Jewellers, Automobile, Electronics, or Bank Branch',
      'Equipped with 2 washrooms, pantry, and centralized AC provision'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  },
  {
    id: 'PROP-03',
    title: 'Corner Commercial Plot for Hospital / Multi-Speciality Clinic',
    type: 'Plot',
    purpose: 'Sell',
    location: 'Sector 4, Main Link Bypass Highway, Shahjahanpur',
    price: '₹1.85 Crore',
    area: '450 Sq. Yards (Corner Plot)',
    suitableForBank: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Clear title registry with 90-B conversion',
      'Corner location with two-side wide 60-ft & 40-ft roads',
      'Ready for immediate construction and registry'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  },
  {
    id: 'PROP-04',
    title: 'Luxury 4 BHK Duplex Villa in Gated Elite Society',
    type: 'House',
    purpose: 'Buy',
    location: 'Shree Krishna Enclave, VIP Colony, Neemrana',
    price: '₹95,00,000',
    area: '2,200 sq.ft Built-up (200 Sq. Yds)',
    suitableForBank: false,
    verified: true,
    bedrooms: '4 BHK',
    furnished: 'Fully Furnished',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Modular kitchen, Italian marble flooring, teakwood doors',
      'Covered car porch, private terrace garden & servant quarters',
      'Gated community with 24x7 security guard, park & temple'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  },
  {
    id: 'PROP-05',
    title: 'Ready Furnished Corporate Office Suite',
    type: 'Commercial',
    purpose: 'Rent',
    location: 'Mahadev Commercial Tower, 2nd Floor, NH-48 Corridor',
    price: '₹42,000 / month',
    area: '1,200 sq.ft',
    suitableForBank: true,
    verified: true,
    furnished: 'Fully Furnished',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      '14 Workstations, 2 Executive Cabins, 1 Conference Room (10-seater)',
      'High-speed optical fiber connectivity & biometric entry',
      'Reserved basement parking and high-speed passenger elevator'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  },
  {
    id: 'PROP-06',
    title: 'Residential Approved Plots near Upcoming Expressway',
    type: 'Plot',
    purpose: 'Buy',
    location: 'Mahadev Green City, Phase 2, Kotputli-Jaipur Highway',
    price: '₹24,500 / Sq. Yard (Sizes: 111, 150, 200 Yds)',
    area: '111 - 250 Sq. Yards',
    suitableForBank: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'JDA / RERA approved township with black-top roads',
      'Underground electricity lines, water connection & sewer lines',
      'Instant 80% bank loan available from SBI, HDFC & Mahadev Finance'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  },
  {
    id: 'PROP-07',
    title: '2 BHK Fully Furnished Modern Flat — Executive Living',
    type: 'Flat',
    purpose: 'Rent',
    location: 'Near RIICO Industrial Hub, Central Neemrana',
    price: '₹22,000 / month',
    area: '1,150 sq.ft Built-up',
    suitableForBank: false,
    verified: true,
    bedrooms: '2 BHK',
    furnished: 'Fully Furnished',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Fully air conditioned, sofa set, 55-inch LED Smart TV & double beds',
      'Modular kitchen equipped with chimney, microwave & double-door fridge',
      'Lift with 100% power backup, 24x7 security guard & covered car parking'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  },
  {
    id: 'PROP-08',
    title: '1 BHK Semi-Furnished Executive Apartment',
    type: 'Flat',
    purpose: 'Rent',
    location: 'Sector 5, Japanese Zone Corridor, Neemrana',
    price: '₹14,000 / month',
    area: '680 sq.ft Built-up',
    suitableForBank: false,
    verified: true,
    bedrooms: '1 BHK',
    furnished: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab00f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&auto=format&fit=crop&q=80'
    ],
    features: [
      'Wardrobe, geyser, modular kitchen racks & curtain rods fitted',
      'Ideal for engineers, doctors, plant managers & corporate staff',
      'Zero brokerage directly through DC Property Vala management'
    ],
    status: 'Available',
    contactPerson: 'Dharmendra Choudhary Danga (DC Property Vala)',
    phone: '+91 98290 12345'
  }
];

const INITIAL_LIBRARY_CONFIG: LibraryConfig = {
  girlsLibrary: {
    name: 'Saraswati Girls Library',
    totalSeats: 60,
    occupiedSeats: 48,
    features: [
      'Exclusive girl students & female aspirants peaceful study sanctuary',
      'Lady supervisor & biometric finger-print attendance',
      'Dedicated private restroom & sanitized powder room',
      'Zero-tolerance noise policy with sound-absorbing acoustic ceiling'
    ],
    specialSecurity: 'Round-the-clock female attendant & safe private entrance'
  },
  boysLibrary: {
    name: 'Mahadev Boys Library',
    totalSeats: 90,
    occupiedSeats: 72,
    features: [
      'Heavy-duty ergonomic high-back chairs for 10+ hours comfortable sitting',
      'Personal LED warm reading lamp + 2 universal power charging sockets per desk',
      'High-speed Dual-Band 300 Mbps Wi-Fi connection with backup line',
      'Free RO chilled and normal drinking water station'
    ]
  },
  shifts: [
    {
      id: 'shift-fullday',
      name: 'Full Day Intensive (24x7 Access)',
      timings: '6:00 AM - 11:00 PM (or 24 Hours)',
      monthlyFee: 1100,
      description: 'Reserved fixed seat with personal locker facility'
    },
    {
      id: 'shift-morning',
      name: 'Morning Shift',
      timings: '6:00 AM - 2:00 PM (8 Hours)',
      monthlyFee: 700,
      description: 'Fresh morning study ambience, daily newspapers'
    },
    {
      id: 'shift-evening',
      name: 'Evening Shift',
      timings: '2:00 PM - 10:00 PM (8 Hours)',
      monthlyFee: 700,
      description: 'Prime post-college/work focused hours with AC'
    },
    {
      id: 'shift-night',
      name: 'Night Owl Shift',
      timings: '10:00 PM - 6:00 AM (8 Hours)',
      monthlyFee: 650,
      description: 'Deep silence night shift for serious aspirants'
    }
  ],
  announcement: 'Admissions Open for 2026 Batch (UPSC, State PCS, SSC, Banking, NEET, JEE & CA Exams). 1 Day Free Demo Available!',
  rules: [
    'Mobile phones must remain on 100% silent mode inside the reading hall.',
    'Discussion or group talk strictly prohibited inside the reading area.',
    'Seat allotment is strictly strictly non-transferable.',
    'ID card must be carried and presented at the biometric entrance desk.'
  ]
};

const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'Mahadev Group (Finance • Properties • Libraries)',
  tagline: 'Trust in Finance • Authority in Real Estate • Focus in Education',
  phone: '+91 77288 94293',
  phoneSecondary: '+91 98283 94293',
  phoneTertiary: '+91 73004 94293',
  phoneExecutive: '+91 94137 92922',
  whatsapp: '917728894293',
  email: 'contact@mahadevgroup.in',
  address: '93, Himmat Jai Motor Vali Gali, Near SBI Bank, Jalori Gate, Jodhpur, Rajasthan - 342001',
  branches: [
    {
      id: 'branch-jalori',
      name: 'Jalori Gate Head Office',
      address: '93, Himmat Jai Motor Vali Gali, Near SBI Bank, Jalori Gate, Jodhpur',
      landmark: 'Near SBI Bank, Jalori Gate',
      area: 'Jalori Gate',
      city: 'Jodhpur',
      pincode: '342001',
      phone: '+91 77288 94293',
      altPhone: '+91 94137 92922',
      tag: 'Head Office & Instant Gold Loan Central Desk',
      googleMapsQuery: '93 Himmat Jai Motor Vali Gali, Near SBI Bank, Jalori Gate, Jodhpur'
    },
    {
      id: 'branch-kudi',
      name: 'Kudi Sector 5 Branch',
      address: '5-G-21, Danga Tower, Kudi 5 Sector, Jodhpur',
      landmark: 'Danga Tower, Kudi Sector 5',
      area: 'Kudi Bhagtasni Housing Board',
      city: 'Jodhpur',
      pincode: '342005',
      phone: '+91 98283 94293',
      tag: 'DC Property Vala & Commercial Leasing Desk',
      googleMapsQuery: '5-G-21 Danga tower kudi 5 sector jodhpur'
    },
    {
      id: 'branch-saraswati',
      name: 'Saraswati Nagar Branch',
      address: 'Veer Tejaji Tower, Ramdev Chowk, Saraswati Nagar, Jodhpur',
      landmark: 'Ramdev Chowk, Veer Tejaji Tower',
      area: 'Saraswati Nagar',
      city: 'Jodhpur',
      pincode: '342005',
      phone: '+91 73004 94293',
      tag: 'Academic Library & Student Study Wings',
      googleMapsQuery: 'Veer tejaji tower ramdev chowk saraswati nagar jodhpur'
    }
  ],
  googleMapsUrl: 'https://maps.google.com/?q=93+Himmat+Jai+Motor+Vali+Gali+Near+SBI+Bank+Jalori+Gate+Jodhpur',
  instagramUrl: 'https://www.instagram.com/dcpropertyvala_jodhpur?stkn=MWRsMWNzY3NtYjJjdA==',
  instagramPersonalUrl: 'https://www.instagram.com/ekshivbhaktt___?stkn=cXJ0YmJjMnduaHJo',
  instagramFinanceUrl: 'https://www.instagram.com/mahadev_finance_jodhpur93?stkn=NnA1ZnY3bnkwMTBx',
  // SHA-256 hash of 'ADMIN@125677656' — never store plain-text password
  adminPin: '203556992716e27549de6f4bab1b7d58e37265d3456d68edf758d3c861db972a',
  noticeBanner: 'Serving Jodhpur across 3 Prime Branches: Jalori Gate, Kudi Sector 5 & Saraswati Nagar.',
  founderImageUrl: 'https://ik.imagekit.io/fdhgiehjz/WhatsApp%20Image%202026-09-29%20at%207.56.02%20PM_nKmI33Jdg.jpeg',
  officeBannerUrl: 'https://ik.imagekit.io/fdhgiehjz/tt.jpeg'
};

const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'APP-10294',
    type: 'gold-loan-enquiry',
    category: 'Finance',
    title: 'Gold Loan Enquiry (65 Grams)',
    customerName: 'Rajesh Meena',
    mobile: '9828114422',
    city: 'Jaipur',
    status: 'In Review',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    details: {
      approxGoldWeight: '65 grams',
      requiredLoanAmount: '₹3,50,000',
      purpose: 'Emergency Business Working Capital',
      preferredTime: 'Morning 10 AM - 12 PM',
      cityArea: 'Mansarovar, Jaipur',
      message: 'Need cash against 22k gold bangles and chain today itself.'
    },
    notes: [
      {
        id: 'n1',
        text: 'Customer contacted on phone. Invited to branch at 11:30 AM with original jewellery for digital karatometer appraisal.',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        author: 'Dharmendra Choudhary Danga'
      }
    ]
  },
  {
    id: 'APP-10293',
    type: 'rental-enquiry',
    category: 'Rental',
    title: 'Bank Space Rental Enquiry',
    customerName: 'Suresh Singhania',
    mobile: '9414022331',
    city: 'Rajasthan',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    details: {
      companyName: 'Private Bank Zonal Expansion Desk',
      contactPerson: 'Suresh Singhania',
      rentalCategory: 'Bank',
      carpetArea: '2,500 - 3,500 sq ft',
      preferredLocation: 'Main Market Road / High Footfall Crossroad',
      expectedBudget: '₹80,000 - ₹1,20,000 / month',
      message: 'Looking for ground floor building with 3-phase power and wide parking for upcoming branch opening.'
    },
    notes: []
  },
  {
    id: 'APP-10292',
    type: 'library-admission',
    category: 'Library',
    title: 'Saraswati Girls Library Admission',
    customerName: 'Pooja Choudhary',
    mobile: '9782550011',
    city: 'Jaipur',
    status: 'Approved',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    details: {
      wing: 'Saraswati Girls Library',
      gender: 'Female',
      examTarget: 'RAS / State Civil Services 2026',
      shift: 'Full Day Intensive (6:00 AM - 11:00 PM)',
      startDate: 'Immediate',
      message: 'Need fixed corner desk with locker for deep preparation.'
    },
    notes: [
      {
        id: 'n2',
        text: 'Seat #G-14 allocated. Fee received for 1st month. ID badge issued.',
        createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
        author: 'Library Admin'
      }
    ]
  },
  {
    id: 'APP-10291',
    type: 'property-listing-request',
    category: 'Property',
    title: 'Property Listing Request (Commercial Plot)',
    customerName: 'Kailash Chand Verma',
    mobile: '9829988771',
    city: 'Jaipur',
    status: 'Follow-up',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    details: {
      propertyType: 'Plot',
      transactionType: 'Sell',
      location: 'Near Metro Station Pillar 124',
      expectedPrice: '₹75,00,000',
      areaDimensions: '250 Sq Yards, 30x75 ft',
      description: 'Commercial conversion done, clear title, immediate seller.'
    },
    notes: [
      {
        id: 'n3',
        text: 'Inspected site on Tuesday. Photos taken for DC Property listing catalogue.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        author: 'Dharmendra Choudhary Danga'
      }
    ]
  }
];

// LocalStorage Keys
const KEYS = {
  APPLICATIONS: 'mahadev_db_applications_v1',
  LOANS: 'mahadev_db_loans_v1',
  PROPERTIES: 'mahadev_db_properties_v1',
  LIBRARY: 'mahadev_db_library_v1',
  SETTINGS: 'mahadev_db_settings_v1',
  CONTENT: 'mahadev_db_content_v1',
  ADMIN_SESSION: 'mahadev_admin_session_v1'
};

class MahadevDatabaseService {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', () => this.notify());
    }
  }

  private init() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(KEYS.APPLICATIONS)) {
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    }
    if (!localStorage.getItem(KEYS.LOANS)) {
      localStorage.setItem(KEYS.LOANS, JSON.stringify(INITIAL_LOANS));
    }
    if (!localStorage.getItem(KEYS.PROPERTIES)) {
      localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
    }
    if (!localStorage.getItem(KEYS.LIBRARY)) {
      localStorage.setItem(KEYS.LIBRARY, JSON.stringify(INITIAL_LIBRARY_CONFIG));
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    }
    if (!localStorage.getItem(KEYS.CONTENT)) {
      localStorage.setItem(KEYS.CONTENT, JSON.stringify(INITIAL_WEBSITE_CONTENT));
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Database listener error:', err);
      }
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mahadev_db_update'));
    }
  }

  // --- APPLICATIONS ---
  public getApplications(): ApplicationRecord[] {
    try {
      const data = localStorage.getItem(KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  public addApplication(
    type: ApplicationType,
    category: ApplicationCategory,
    title: string,
    customerName: string,
    mobile: string,
    city: string,
    details: Record<string, any>
  ): ApplicationRecord {
    const apps = this.getApplications();
    const newRecord: ApplicationRecord = {
      id: `APP-${Math.floor(10000 + Math.random() * 90000)}`,
      type,
      category,
      title,
      customerName,
      mobile,
      city: city || 'Local Area',
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      details,
      notes: [
        {
          id: `n-${Date.now()}`,
          text: `Application received online via ${category} service portal.`,
          createdAt: new Date().toISOString(),
          author: 'System Auto-Log'
        }
      ]
    };

    const updated = [newRecord, ...apps];
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(updated));
    this.notify();
    return newRecord;
  }

  public updateApplicationStatus(id: string, status: ApplicationStatus): boolean {
    const apps = this.getApplications();
    const idx = apps.findIndex((a) => a.id === id);
    if (idx === -1) return false;

    apps[idx].status = status;
    apps[idx].updatedAt = new Date().toISOString();
    apps[idx].notes.push({
      id: `n-${Date.now()}`,
      text: `Status updated to "${status}"`,
      createdAt: new Date().toISOString(),
      author: 'Admin'
    });

    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    this.notify();
    return true;
  }

  public addApplicationNote(id: string, noteText: string, author: string = 'Admin'): boolean {
    const apps = this.getApplications();
    const idx = apps.findIndex((a) => a.id === id);
    if (idx === -1) return false;

    apps[idx].notes.push({
      id: `n-${Date.now()}`,
      text: noteText,
      createdAt: new Date().toISOString(),
      author
    });
    apps[idx].updatedAt = new Date().toISOString();

    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    this.notify();
    return true;
  }

  public deleteApplication(id: string): boolean {
    const apps = this.getApplications();
    const filtered = apps.filter((a) => a.id !== id);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(filtered));
    this.notify();
    return true;
  }

  // --- LOANS MANAGEMENT ---
  public getLoans(): LoanCategoryItem[] {
    try {
      const data = localStorage.getItem(KEYS.LOANS);
      return data ? JSON.parse(data) : INITIAL_LOANS;
    } catch {
      return INITIAL_LOANS;
    }
  }

  public saveLoan(loan: LoanCategoryItem): void {
    const loans = this.getLoans();
    const idx = loans.findIndex((l) => l.id === loan.id);
    if (idx >= 0) {
      loans[idx] = loan;
    } else {
      loans.push(loan);
    }
    localStorage.setItem(KEYS.LOANS, JSON.stringify(loans));
    this.notify();
  }

  public deleteLoan(id: string): void {
    const loans = this.getLoans().filter((l) => l.id !== id);
    localStorage.setItem(KEYS.LOANS, JSON.stringify(loans));
    this.notify();
  }

  // --- PROPERTIES MANAGEMENT ---
  public getProperties(): PropertyListingItem[] {
    try {
      const data = localStorage.getItem(KEYS.PROPERTIES);
      if (!data) return INITIAL_PROPERTIES;
      const parsed: PropertyListingItem[] = JSON.parse(data);
      return parsed.map((item) => {
        const fallback = INITIAL_PROPERTIES.find((p) => p.id === item.id);
        return {
          ...item,
          images: item.images && item.images.length > 0 ? item.images : (fallback?.images || [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80'
          ]),
          verified: item.verified !== undefined ? item.verified : true,
          furnished: item.furnished || fallback?.furnished || 'Semi-Furnished',
          bedrooms: item.bedrooms || fallback?.bedrooms,
          contactPerson: !item.contactPerson || item.contactPerson.includes('Sharma')
            ? 'Dharmendra Choudhary Danga (DC Property Vala)'
            : item.contactPerson
        };
      });
    } catch {
      return INITIAL_PROPERTIES;
    }
  }

  public saveProperty(property: PropertyListingItem): void {
    const props = this.getProperties();
    const idx = props.findIndex((p) => p.id === property.id);
    if (idx >= 0) {
      props[idx] = property;
    } else {
      props.push(property);
    }
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(props));
    this.notify();
  }

  public deleteProperty(id: string): void {
    const props = this.getProperties().filter((p) => p.id !== id);
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(props));
    this.notify();
  }

  // --- LIBRARY CONFIG MANAGEMENT ---
  public getLibraryConfig(): LibraryConfig {
    try {
      const data = localStorage.getItem(KEYS.LIBRARY);
      return data ? JSON.parse(data) : INITIAL_LIBRARY_CONFIG;
    } catch {
      return INITIAL_LIBRARY_CONFIG;
    }
  }

  public saveLibraryConfig(config: LibraryConfig): void {
    localStorage.setItem(KEYS.LIBRARY, JSON.stringify(config));
    this.notify();
  }

  // --- SITE SETTINGS ---
  public getSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (!data) return INITIAL_SETTINGS;
      const parsed = JSON.parse(data);
      // Auto-migrate if address is old or phone is old or branches missing/without numbers
      if (
        !parsed.branches ||
        parsed.branches.length < 3 ||
        !parsed.address ||
        !parsed.address.includes('Jodhpur') ||
        !parsed.phone ||
        parsed.phone.includes('98290 12345') ||
        !parsed.phoneExecutive ||
        !parsed.branches[0]?.phone ||
        !parsed.founderImageUrl ||
        parsed.founderImageUrl.includes('Founder.jpeg') ||
        parsed.founderImageUrl.includes('10.50.51') ||
        !parsed.founderImageUrl.includes('nKmI33Jdg') ||
        !parsed.instagramUrl ||
        !parsed.instagramUrl.includes('dcpropertyvala_jodhpur') ||
        !parsed.instagramPersonalUrl ||
        !parsed.instagramFinanceUrl ||
        !parsed.officeBannerUrl ||
        parsed.officeBannerUrl.includes('office.jpeg')
      ) {
        const merged: SiteSettings = {
          ...INITIAL_SETTINGS,
          ...parsed,
          phone: INITIAL_SETTINGS.phone,
          phoneSecondary: INITIAL_SETTINGS.phoneSecondary,
          phoneTertiary: INITIAL_SETTINGS.phoneTertiary,
          phoneExecutive: INITIAL_SETTINGS.phoneExecutive,
          whatsapp: INITIAL_SETTINGS.whatsapp,
          address: INITIAL_SETTINGS.address,
          branches: INITIAL_SETTINGS.branches,
          founderImageUrl: INITIAL_SETTINGS.founderImageUrl,
          instagramUrl: INITIAL_SETTINGS.instagramUrl,
          instagramPersonalUrl: INITIAL_SETTINGS.instagramPersonalUrl,
          instagramFinanceUrl: INITIAL_SETTINGS.instagramFinanceUrl,
          officeBannerUrl: INITIAL_SETTINGS.officeBannerUrl
        };
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  public saveSettings(settings: SiteSettings): void {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    this.notify();
  }

  // Migrate plain-text PIN to secure hash on app init
  public async migrateAdminPin(): Promise<void> {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (!data) return;
      const parsed = JSON.parse(data);
      // If pin is not a 64-char hex SHA-256 hash, it's plain text — upgrade silently
      if (parsed.adminPin && parsed.adminPin.length < 64) {
        parsed.adminPin = INITIAL_SETTINGS.adminPin;
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(parsed));
      }
    } catch {
      // ignore
    }
  }

  // --- CONTENT ---
  public getContent(): WebsiteContent {
    try {
      const data = localStorage.getItem(KEYS.CONTENT);
      if (!data) return INITIAL_WEBSITE_CONTENT;
      const saved = JSON.parse(data) as WebsiteContent;
      // Deep-merge: add any new pages/sections/fields from the seed that aren't in saved
      const merged: WebsiteContent = { ...INITIAL_WEBSITE_CONTENT };
      for (const page of Object.keys(saved)) {
        if (!merged[page]) merged[page] = {};
        for (const section of Object.keys(saved[page])) {
          if (!merged[page][section]) merged[page][section] = {};
          for (const field of Object.keys(saved[page][section])) {
            merged[page][section][field] = saved[page][section][field];
          }
        }
      }
      return merged;
    } catch {
      return INITIAL_WEBSITE_CONTENT;
    }
  }

  public saveContent(content: WebsiteContent) {
    localStorage.setItem(KEYS.CONTENT, JSON.stringify(content));
    this.notify();
  }

  // --- AUTH / ADMIN PIN ---
  private async hashPin(pin: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  public isAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(KEYS.ADMIN_SESSION) === 'true';
  }

  public async adminLogin(pin: string): Promise<boolean> {
    const settings = this.getSettings();
    const hashed = await this.hashPin(pin);
    if (hashed === settings.adminPin) {
      sessionStorage.setItem(KEYS.ADMIN_SESSION, 'true');
      return true;
    }
    return false;
  }

  public adminLogout(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(KEYS.ADMIN_SESSION);
  }

  // Reset to default seed
  public resetToDefaults(): void {
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(KEYS.LOANS, JSON.stringify(INITIAL_LOANS));
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(INITIAL_PROPERTIES));
    localStorage.setItem(KEYS.LIBRARY, JSON.stringify(INITIAL_LIBRARY_CONFIG));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    this.notify();
  }

  public resetContent(): void {
    localStorage.setItem(KEYS.CONTENT, JSON.stringify(INITIAL_WEBSITE_CONTENT));
    this.notify();
  }
}

export const dbService = new MahadevDatabaseService();

