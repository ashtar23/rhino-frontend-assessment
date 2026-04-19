import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts } from "@repo/data";
import { isMarket } from "@repo/types";
import { ProductCard } from "@repo/ui";

type PageProps = {
  params: Promise<{ market: string }>;
};

const PRODUCT_LIST_LIMIT = 12;
const PRODUCTS_REVALIDATE_SECONDS = 300;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { market } = await params;

  if (!isMarket(market)) {
    return { title: "Products" };
  }

  return {
    title: `Project A Products (${market.toUpperCase()})`,
    description: "Server-rendered product listing for Project A",
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const { market } = await params;

  if (!isMarket(market)) {
    notFound();
  }

  const products = await getProducts(market, {
    limit: PRODUCT_LIST_LIMIT,
    requestOptions: {
      next: { revalidate: PRODUCTS_REVALIDATE_SECONDS },
    },
  });

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          Products
        </h1>
        <p className="text-zinc-600">Listing refreshed every five minutes</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            titlePosition="bottom-left"
            layout="vertical"
            market={market}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
