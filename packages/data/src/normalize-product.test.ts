import {
  getProductIdFromSlug,
  normalizeProduct,
  toProductSlug,
} from "./normalize-product";

describe("product slug helpers", () => {
  it("creates a stable slug from title and id", () => {
    expect(toProductSlug("Calvin Klein CK One", 12)).toBe(
      "calvin-klein-ck-one-12",
    );
  });

  it("extracts the product id from a slug", () => {
    expect(getProductIdFromSlug("calvin-klein-ck-one-12")).toBe(12);
  });

  it("returns null when a slug has no trailing id", () => {
    expect(getProductIdFromSlug("calvin-klein-ck-one")).toBeNull();
  });
});

describe("normalizeProduct", () => {
  it("maps DummyJSON fields into the internal product shape", () => {
    const product = normalizeProduct(
      {
        id: 7,
        title: "Classic Red Lipstick",
        description: "A bold lipstick.",
        price: 18,
        category: "beauty",
        tags: ["beauty", "lipstick"],
        thumbnail: "https://cdn.example.com/thumb.jpg",
        images: ["https://cdn.example.com/thumb.jpg"],
        rating: 4.8,
        brand: "Beauty Co",
        stock: 22,
        sku: "LIP-7",
        warrantyInformation: "No warranty",
        shippingInformation: "Ships in 3 days",
        availabilityStatus: "In Stock",
      },
      "EUR",
    );

    expect(product).toMatchObject({
      id: 7,
      slug: "classic-red-lipstick-7",
      currency: "EUR",
      category: "beauty",
      tags: ["beauty", "lipstick"],
      brand: "Beauty Co",
      stock: 22,
    });
  });
});
