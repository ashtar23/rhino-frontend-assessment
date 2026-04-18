import type { ComponentPropsWithoutRef } from "react";
import { render, screen, within } from "@testing-library/react";
import type { Product } from "@repo/data";
import { ProductCard } from "./product-card";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ComponentPropsWithoutRef<"img">) => <img {...props} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const product: Product = {
  id: 1,
  slug: "test-product-1",
  title: "Test Product",
  description: "A useful shared card fixture.",
  price: 49,
  currency: "EUR",
  category: "test",
  tags: ["sport", "elegant"],
  image: "https://cdn.example.com/product-1.jpg",
  images: [
    "https://cdn.example.com/product-1.jpg",
    "https://cdn.example.com/product-1-alt.jpg",
  ],
  rating: 4.8,
};

describe("ProductCard", () => {
  it("renders a vertical card with the default props", () => {
    render(<ProductCard market="en" product={product} />);

    expect(screen.getByTestId("product-card-vertical")).toBeInTheDocument();
    expect(
      screen.queryByTestId("product-card-horizontal"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("View product")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-title-block")).toHaveAttribute(
      "data-title-position",
      "top-right",
    );
  });

  it("renders a horizontal card with a distinct layout branch", () => {
    render(<ProductCard market="en" product={product} layout="horizontal" />);

    expect(screen.getByTestId("product-card-horizontal")).toBeInTheDocument();
    expect(
      screen.queryByTestId("product-card-vertical"),
    ).not.toBeInTheDocument();
  });

  it("hides category tags when product tags are empty", () => {
    render(
      <ProductCard
        market="en"
        product={{
          ...product,
          tags: [],
        }}
      />,
    );

    expect(screen.queryByText("sport")).not.toBeInTheDocument();
  });

  it("shows product tags above the title when tags are provided", () => {
    render(<ProductCard market="en" product={product} />);

    const titleBlock = screen.getByTestId("product-card-title-block");

    expect(within(titleBlock).getByText("sport")).toBeInTheDocument();
    expect(within(titleBlock).getByText("elegant")).toBeInTheDocument();
    expect(
      within(titleBlock).getByRole("heading", { name: "Test Product" }),
    ).toBeInTheDocument();
  });

  it("hides the secondary image when secondaryImage is not provided", () => {
    render(<ProductCard market="en" product={product} />);

    expect(
      screen.queryByAltText("Test Product secondary"),
    ).not.toBeInTheDocument();
  });

  it("shows the secondary image when secondaryImage is provided", () => {
    render(
      <ProductCard
        market="en"
        product={product}
        secondaryImage={product.images[1]}
      />,
    );

    expect(screen.getByAltText("Test Product secondary")).toBeInTheDocument();
  });

  it("applies a custom CTA label when provided", () => {
    render(
      <ProductCard market="en" product={product} ctaLabel="Explore item" />,
    );

    expect(screen.getByText("Explore item")).toBeInTheDocument();
  });
});
