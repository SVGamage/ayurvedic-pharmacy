export interface Service {
  id?: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  category?: "ayurvedic" | "nakshatra";
  image?: string;
  buttonText?: string;
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}