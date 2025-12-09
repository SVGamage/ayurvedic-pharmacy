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
  companyProducts: CompanyProduct[];
}
