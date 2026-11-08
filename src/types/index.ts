export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categoryName: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  badge?: "New" | "Bestseller" | "Sale" | "Exclusive" | "Trending";
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  details: string[];
  composition: string;
  care: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique combo of product.id + color + size
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface TemplateSectionField {
  name: string;
  label: string;
  type: "text" | "textarea" | "image" | "link" | "number" | "boolean";
  default: string | number | boolean;
}

export interface TemplateSection {
  id: string;
  name: string;
  order: number;
  enabled: boolean;
  fields: TemplateSectionField[];
  defaultValues: Record<string, any>;
}

export interface TemplateConfig {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  author: string;
  preview: {
    thumbnail: string;
    desktop: string;
    mobile: string;
  };
  sections: TemplateSection[];
}
