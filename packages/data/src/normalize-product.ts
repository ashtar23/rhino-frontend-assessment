import type { DummyJsonProduct, Product } from "./product.types";

/**
 * Converts a product title and id into a URL friendly slug
 */
export const toProductSlug = (title: string, id: number) => {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${id}`;
};

export const getProductIdFromSlug = (slug: string) => {
  const match = slug.match(/-(\d+)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
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
    slug: toProductSlug(product.title, product.id),
    title: product.title,
    description: product.description,
    price: product.price,
    currency,
    category: product.category,
    tags: product.tags,
    image: product.thumbnail,
    images: product.images,
    rating: product.rating,
    brand: product.brand,
    stock: product.stock,
    sku: product.sku,
    warrantyInformation: product.warrantyInformation,
    shippingInformation: product.shippingInformation,
    availabilityStatus: product.availabilityStatus,
  };
};
