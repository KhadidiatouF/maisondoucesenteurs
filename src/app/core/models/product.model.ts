export interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  size?: string;
  stock: number;
  isPopular?: boolean;
  notes?: ProductNotes;
}
