export interface CompanyProduct {
  id?: string;
  name: string;
  code: string;
  price: string;
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
