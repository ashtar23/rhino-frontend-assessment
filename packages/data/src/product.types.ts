export type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: "EUR" | "CAD";
  category: string;
  image: string;
  images: string[];
  rating: number;
  brand?: string;
  stock?: number;
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
};

export type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  brand?: string;
  stock?: number;
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
};

export type DummyJsonProductsResponse = {
  products: DummyJsonProduct[];
};
