export interface Review {
  id?: string;
  name: string;
  location?: string;
  avatar?: string;
  rating: number;
  text: string;
  treatment?: string;
  date?: string;
  verified?: boolean;
  category?: "ayurvedic" | "nakshatra" | "product";
  helpful?: number;
}
