export interface CompanyProfile {
  name: string;
  industry: string;
  yearsInBusiness: number;
  location: string;
  employees: number;
  businessType: string;
  primaryProducts: string;
}

export interface FinancialInfo {
  annualRevenue: number;
  revenueGrowth: Array<{ year: number; revenue: number; growth?: number }>;
  netIncome: number;
  currentAssets: number;
  currentLiabilities: number;
  totalAssets: number;
  totalDebt: number;
  debtToEquityRatio: number;
  currentRatio: number;
  operatingCashFlow: number;
  creditScore: number;
}

export interface LoanRequest {
  amount: number;
  purpose: string;
  equipmentDetails: Array<{ item: string; cost: number }>;
  downPayment: number;
  requestedTerm: number;
  equipmentSpecs: {
    type: string;
    expectedLife: number;
    warranty: number;
  };
}

export interface BankingRelationship {
  customerSince: number;
  currentServices: string[];
  paymentHistory: string;
  avgMonthlyBalance: number;
  relationshipProfitability: number;
}

export interface MarketContext {
  industryGrowth: number;
  localMarket: string;
  customerBase: { longTerm: number; prospects: number };
  competition: number;
  financingRates: { min: number; max: number };
}

export interface LoanAnalysisData {
  company: CompanyProfile;
  financials: FinancialInfo;
  loanRequest: LoanRequest;
  banking: BankingRelationship;
  market: MarketContext;
}

export const techStartData: LoanAnalysisData = {
  company: {
    name: "TechStart Manufacturing LLC",
    industry: "Precision Manufacturing & Machining",
    yearsInBusiness: 5,
    location: "Austin, Texas",
    employees: 28,
    businessType: "LLC, Manufacturing",
    primaryProducts: "Custom precision parts for aerospace and automotive industries"
  },
  financials: {
    annualRevenue: 3200000,
    revenueGrowth: [
      { year: 2024, revenue: 3200000 },
      { year: 2023, revenue: 2800000, growth: 14 },
      { year: 2022, revenue: 2400000, growth: 17 },
      { year: 2021, revenue: 1900000, growth: 27 },
      { year: 2020, revenue: 1500000 }
    ],
    netIncome: 385000,
    currentAssets: 890000,
    currentLiabilities: 340000,
    totalAssets: 1800000,
    totalDebt: 520000,
    debtToEquityRatio: 0.41,
    currentRatio: 2.62,
    operatingCashFlow: 420000,
    creditScore: 742
  },
  loanRequest: {
    amount: 850000,
    purpose: "Purchase 3 new CNC machines (Haas VF-4SS)",
    equipmentDetails: [
      { item: "Haas VF-4SS Machine 1", cost: 285000 },
      { item: "Haas VF-4SS Machine 2", cost: 285000 },
      { item: "Haas VF-4SS Machine 3", cost: 280000 }
    ],
    downPayment: 0,
    requestedTerm: 7,
    equipmentSpecs: {
      type: "New Haas VF-4SS CNC Vertical Machining Centers",
      expectedLife: 15,
      warranty: 2
    }
  },
  banking: {
    customerSince: 3,
    currentServices: ["Business checking", "savings", "previous equipment loan ($180,000 - paid on time)"],
    paymentHistory: "Perfect payment record",
    avgMonthlyBalance: 125000,
    relationshipProfitability: 18500
  },
  market: {
    industryGrowth: 6,
    localMarket: "Austin manufacturing hub expanding",
    customerBase: { longTerm: 15, prospects: 8 },
    competition: 12,
    financingRates: { min: 5.8, max: 7.2 }
  }
};

export interface Agent {
  id: string;
  name: string;
  role: string;
  type: 'primary' | 'micro';
  avatar: string;
  expertise: string[];
}

export const agents: Agent[] = [
  {
    id: 'robert',
    name: 'Robert',
    role: 'Risk Assessment Agent',
    type: 'primary',
    avatar: '👔',
    expertise: ['Credit Analysis', 'Risk Management', 'Financial Assessment']
  },
  {
    id: 'elena',
    name: 'Elena',
    role: 'Credit Risk Microagent',
    type: 'micro',
    avatar: '📊',
    expertise: ['Financial Metrics', 'Debt Analysis', 'Cash Flow']
  },
  {
    id: 'lisa',
    name: 'Lisa',
    role: 'Legal Compliance Agent',
    type: 'primary',
    avatar: '⚖️',
    expertise: ['Regulatory Compliance', 'Documentation', 'Legal Requirements']
  },
  {
    id: 'matthew',
    name: 'Matthew',
    role: 'Compliance Microagent',
    type: 'micro',
    avatar: '📋',
    expertise: ['Regulatory Requirements', 'Documentation Review']
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Sales & Marketing Agent',
    type: 'primary',
    avatar: '📈',
    expertise: ['Market Analysis', 'Customer Relations', 'Competitive Intelligence']
  },
  {
    id: 'victoria',
    name: 'Victoria',
    role: 'Product Strategy Agent',
    type: 'primary',
    avatar: '🎯',
    expertise: ['Portfolio Management', 'Strategic Planning', 'Product Development']
  }
];