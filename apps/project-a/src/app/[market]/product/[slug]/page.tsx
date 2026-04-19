import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@repo/data";
import { isMarket } from "@repo/types";
import { getSessionUser } from "@/features/auth/session";

type PageProps = {
  params: Promise<{ market: string; slug: string }>;
};

const PRODUCTS_REVALIDATE_SECONDS = 300;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { market, slug } = await params;

  if (!isMarket(market)) {
    return { title: "Product" };
  }

  const product = await getProductBySlug(market, slug, {
    requestOptions: {
      next: { revalidate: PRODUCTS_REVALIDATE_SECONDS },
    },
  });

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.title} | Project A`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { market, slug } = await params;

  if (!isMarket(market)) {
    notFound();
  }

  const product = await getProductBySlug(market, slug, {
    requestOptions: {
      next: { revalidate: PRODUCTS_REVALIDATE_SECONDS },
    },
  });

  if (!product) {
    notFound();
  }

  const user = await getSessionUser();

  return (
    <section className="space-y-8">
      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
          <Image
            src={product.image}
            alt={product.title}
            width={900}
            height={700}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">
              {product.category}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
              {product.title}
            </h1>
            <p className="text-zinc-600">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
            <span>Rating: {product.rating}</span>
            {product.brand ? <span>Brand: {product.brand}</span> : null}
            {product.availabilityStatus ? (
              <span>{product.availabilityStatus}</span>
            ) : null}
          </div>

          <div className="rounded-2xl border border-zinc-200 p-5">
            <p className="text-sm text-zinc-500">Price</p>
            <p className="mt-1 text-2xl font-semibold text-zinc-950">
              {product.price} {product.currency}
            </p>
          </div>
        </div>
      </div>

      {user ? (
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-950">
            Extended product details
          </h2>

          <div className="mt-4 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
            <p>Viewer: {user.username}</p>
            <p>Role: {user.role}</p>
            {product.stock !== undefined ? <p>Stock: {product.stock}</p> : null}
            {product.sku ? <p>SKU: {product.sku}</p> : null}
            {product.warrantyInformation ? (
              <p>Warranty: {product.warrantyInformation}</p>
            ) : null}
            {product.shippingInformation ? (
              <p>Shipping: {product.shippingInformation}</p>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-zinc-300 p-6">
          <h2 className="text-xl font-semibold text-zinc-950">
            Extended product details
          </h2>
          <p className="mt-2 text-zinc-600">
            Sign in to view protected product information.
          </p>
        </section>
      )}
    </section>
  );
}
