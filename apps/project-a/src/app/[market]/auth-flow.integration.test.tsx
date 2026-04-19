import { SESSION_COOKIE } from "@repo/auth";
import { getProductBySlug, type Product } from "@repo/data";
import { renderToStaticMarkup } from "react-dom/server";
import { submitLogin } from "./login/page";
import ProductDetailPage from "./product/[slug]/page";

jest.mock("@repo/data", () => {
  const actual = jest.requireActual("@repo/data");

  return {
    ...actual,
    getProductBySlug: jest.fn(),
  };
});

jest.mock("next/headers", () => {
  const cookieState = new Map<string, string>();
  const cookieStore = {
    get: jest.fn((name: string) => {
      const value = cookieState.get(name);

      return value ? { name, value } : undefined;
    }),
    set: jest.fn((name: string, value: string) => {
      cookieState.set(name, value);
    }),
  };

  return {
    __cookieState: cookieState,
    __cookieStore: cookieStore,
    cookies: jest.fn(async () => cookieStore),
  };
});

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
  redirect: jest.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: () => null,
}));

const productFixture: Product = {
  availabilityStatus: "In Stock",
  brand: "Acme",
  category: "electronics",
  currency: "EUR",
  description: "A great product",
  id: 42,
  image: "https://cdn.example.com/product.jpg",
  images: ["https://cdn.example.com/product.jpg"],
  price: 99,
  rating: 4.8,
  shippingInformation: "Ships tomorrow",
  sku: "SKU-42",
  slug: "great-product-42",
  stock: 7,
  tags: ["featured"],
  title: "Great Product",
  warrantyInformation: "2 years",
};

type CookieMockModule = {
  __cookieState: Map<string, string>;
  __cookieStore: {
    get: jest.Mock;
    set: jest.Mock;
  };
};

describe("project-a auth integration", () => {
  const mockedGetProductBySlug = jest.mocked(getProductBySlug);
  const headersModule = jest.requireMock("next/headers") as CookieMockModule;

  beforeEach(() => {
    headersModule.__cookieState.clear();
    headersModule.__cookieStore.get.mockClear();
    headersModule.__cookieStore.set.mockClear();
    mockedGetProductBySlug.mockReset();
  });

  it("sets a session on sign in and shows protected product details", async () => {
    mockedGetProductBySlug.mockResolvedValue(productFixture);

    const formData = new FormData();
    formData.set("username", "user");
    formData.set("password", "user123");

    await expect(submitLogin("en", formData)).rejects.toThrow(
      "NEXT_REDIRECT:/en",
    );

    expect(headersModule.__cookieStore.set).toHaveBeenCalledWith(
      SESSION_COOKIE,
      expect.any(String),
      expect.objectContaining({
        httpOnly: true,
        path: "/",
      }),
    );

    expect(headersModule.__cookieState.get(SESSION_COOKIE)).toBeTruthy();

    const detailPage = await ProductDetailPage({
      params: Promise.resolve({
        market: "en",
        slug: productFixture.slug,
      }),
    });

    const html = renderToStaticMarkup(detailPage);

    expect(html).toContain("Extended product details");
    expect(html).toContain("Viewer: user");
    expect(html).toContain("Role: user");
    expect(html).toContain("Stock: 7");
    expect(html).not.toContain(
      "Sign in to view protected product information.",
    );
  });
});
