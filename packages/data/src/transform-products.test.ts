import type { Product } from "./product.types";
import { transformProductsForListing } from "./transform-products";

const makeProduct = (id: number): Product => ({
  id,
  slug: `product-${id}`,
  title: `Product ${id}`,
  description: `Description ${id}`,
  price: id * 10,
  currency: "EUR",
  category: "test",
  image: `https://cdn.example.com/${id}.jpg`,
  images: [`https://cdn.example.com/${id}.jpg`],
  rating: 4,
});

describe("transformProductsForListing", () => {
  const realDateNow = Date.now;

  afterEach(() => {
    Date.now = realDateNow;
  });

  it("keeps the same number of products", () => {
    Date.now = jest.fn(() => 0);

    const products = Array.from({ length: 12 }, (_, index) =>
      makeProduct(index + 1),
    );

    const result = transformProductsForListing(products);

    expect(result).toHaveLength(12);
  });

  it("rotates the first 10 products based on the current bucket", () => {
    Date.now = jest.fn(() => 1000 * 60 * 5 * 2);

    const products = Array.from({ length: 12 }, (_, index) =>
      makeProduct(index + 1),
    );

    const result = transformProductsForListing(products);

    expect(result.slice(0, 3).map((product) => product.id)).toEqual([3, 4, 5]);
    expect(result.slice(10).map((product) => product.id)).toEqual([11, 12]);
  });

  it("returns the input unchanged when there is only one product", () => {
    const products = [makeProduct(1)];

    expect(transformProductsForListing(products)).toEqual(products);
  });
});
