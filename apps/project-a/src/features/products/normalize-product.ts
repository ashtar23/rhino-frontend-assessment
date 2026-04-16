import type { DummyJsonProduct, Product } from "./product.types";

/**
 * Converts a product title and id into a URL friendly slug
 */
const toSlug = (title: string, id: number) => {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${id}`;
};

/**
 * Normalizes a product from the DummyJson API to the Product type
 * It generates a slug for the product based on its title and id,
 * and maps the thumbnail to the main image field
 */
export const normalizeProduct = (
  product: DummyJsonProduct,
  currency: "EUR" | "CAD",
): Product => {
  return {
    id: product.id,
    slug: toSlug(product.title, product.id),
    title: product.title,
    description: product.description,
    price: product.price,
    currency,
    category: product.category,
    image: product.thumbnail,
    images: product.images,
    rating: product.rating,
  };
};
