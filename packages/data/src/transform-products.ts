import type { Product } from "./product.types";

export const transformProductsForListing = (products: Product[]) => {
  const firstTen = products.slice(0, 10);
  const rest = products.slice(10);

  if (firstTen.length <= 1) {
    return products;
  }

  const bucket = Math.floor(Date.now() / (1000 * 60 * 5));
  const rotation = bucket % firstTen.length;

  const rotated: Product[] = firstTen.map((_, index) => {
    const nextProduct = firstTen[(index + rotation) % firstTen.length];

    if (!nextProduct) {
      throw new Error("Missing product during rotation");
    }

    return nextProduct;
  });

  console.log("products listing regenerated", {
    bucket,
    rotation,
    count: rotated.length,
  });

  return [...rotated, ...rest];
};
