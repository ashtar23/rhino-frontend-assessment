import { DUMMYJSON_PRODUCTS_API_URL } from "@repo/constants";
import type { Market } from "@repo/types";
import { getProductIdFromSlug, normalizeProduct } from "./normalize-product";
import { transformProductsForListing } from "./transform-products";
import type {
  DummyJsonProduct,
  DummyJsonProductsResponse,
  Product,
} from "./product.types";

export type ProductRequestOptions = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

type GetProductsOptions = {
  limit?: number;
  requestOptions?: ProductRequestOptions;
};

type GetProductBySlugOptions = {
  requestOptions?: ProductRequestOptions;
};

const getCurrencyForMarket = (market: Market) => {
  return market === "ca" ? "CAD" : "EUR";
};

const getProductsListUrl = (limit?: number) => {
  const url = new URL(DUMMYJSON_PRODUCTS_API_URL);

  if (limit !== undefined) {
    url.searchParams.set("limit", String(limit));
  }

  return url.toString();
};

export const getProducts = async (
  market: Market,
  options: GetProductsOptions = {},
): Promise<Product[]> => {
  const response = await fetch(
    getProductsListUrl(options.limit),
    options.requestOptions,
  );

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
  options: GetProductBySlugOptions = {},
): Promise<Product | null> => {
  const productId = getProductIdFromSlug(slug);

  if (!productId) {
    return null;
  }

  const response = await fetch(
    `${DUMMYJSON_PRODUCTS_API_URL}/${productId}`,
    options.requestOptions,
  );

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
