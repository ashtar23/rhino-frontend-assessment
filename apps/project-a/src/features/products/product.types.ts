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
};

export type DummyJsonProductsResponse = {
  products: DummyJsonProduct[];
};
