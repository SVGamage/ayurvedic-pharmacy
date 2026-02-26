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
