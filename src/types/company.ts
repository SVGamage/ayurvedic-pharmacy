export interface PriceVariant {
  variant: string;
  price: number;
}

export interface CompanyProduct {
  id?: string;
  name: string;
  code: string;
  prices?: PriceVariant[];
  subCategoryId?: string;
  companyId?: string;
  subCategory?: {
    id: string;
    name: string;
  };
}

export interface Company {
  id: string;
  name: string;
  image?: string;
  description?: string;
  phone?: string;
  address?: string;
  email?: string;
  companyProducts: CompanyProduct[];
}

// Public brand index row (/api/companies)
export interface BrandSummary {
  id: string;
  name: string;
  image?: string | null;
  description?: string | null;
  productCount: number;
}

// Public brand page (/api/companies/[id])
export interface BrandProduct {
  id: string;
  name: string;
  code: string;
  subCategory?: { id: string; name: string } | null;
  prices: PriceVariant[];
}

export interface BrandDetail {
  id: string;
  name: string;
  image?: string | null;
  description?: string | null;
  products: BrandProduct[];
}
