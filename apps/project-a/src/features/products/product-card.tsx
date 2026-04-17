import Link from "next/link";
import Image from "next/image";
import type { Market } from "@repo/types";
import type { Product } from "@repo/data";

type ProductCardProps = {
  market: Market;
  product: Product;
};

export const ProductCard = ({ market, product }: ProductCardProps) => {
  return (
    <article className="rounded-2xl border p-4 shadow-sm">
      <Image
        src={product.image}
        alt={product.title}
        width={400}
        height={300}
        className="aspect-auto w-full rounded-xl object-cover"
      />

      <div className="mt-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs uppercase text-gray-500">{product.category}</p>
          <h2 className="text-lg font-medium">{product.title}</h2>
        </div>

        <p className="text-sm text-gray-600">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="font-medium">
            {product.price} {product.currency}
          </span>

          <Link
            href={`/${market}/product/${product.slug}`}
            className="rounded-md border px-3 py-2 text-sm"
          >
            View product
          </Link>
        </div>
      </div>
    </article>
  );
};
