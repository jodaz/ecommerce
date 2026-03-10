export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface ProductCarouselItem {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  cta?: string;
}
