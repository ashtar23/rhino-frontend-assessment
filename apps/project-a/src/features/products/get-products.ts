import { normalizeProduct } from "./normalize-product";
import type { DummyJsonProductsResponse, Product } from "./product.types";
import { transformProductsForListing } from "./transform-products";
import type { Market } from "@repo/types";

const API_URL = "https://dummyjson.com/products?limit=12";

export const getProducts = async (market: Market): Promise<Product[]> => {
  const response = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await response.json()) as DummyJsonProductsResponse;
  const currency = market === "ca" ? "CAD" : "EUR";

  const normalized = data.products.map((product) =>
    normalizeProduct(product, currency),
  );

  return transformProductsForListing(normalized);
};
