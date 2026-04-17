import {
  getProductIdFromSlug,
  normalizeProduct,
  transformProductsForListing,
  type DummyJsonProduct,
  type DummyJsonProductsResponse,
  type Product,
} from "@repo/data";

import type { Market } from "@repo/types";

const LIST_API_URL = "https://dummyjson.com/products?limit=12";
const PRODUCT_API_URL = "https://dummyjson.com/products";

const getCurrencyForMarket = (market: Market) => {
  return market === "ca" ? "CAD" : "EUR";
};

export const getProducts = async (market: Market): Promise<Product[]> => {
  const response = await fetch(LIST_API_URL, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await response.json()) as DummyJsonProductsResponse;
  const currency = getCurrencyForMarket(market);

  const normalized = data.products.map((product) =>
    normalizeProduct(product, currency),
  );

  return transformProductsForListing(normalized);
};

export const getProductBySlug = async (
  market: Market,
  slug: string,
): Promise<Product | null> => {
  const productId = getProductIdFromSlug(slug);

  if (!productId) {
    return null;
  }

  const response = await fetch(`${PRODUCT_API_URL}/${productId}`, {
    next: { revalidate: 300 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = (await response.json()) as DummyJsonProduct;
  const product = normalizeProduct(data, getCurrencyForMarket(market));

  return product.slug === slug ? product : null;
};
