import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandConfig } from "@repo/constants";
import { isMarket } from "@repo/types";

type PageProps = {
  params: Promise<{ market: string }>;
};

export default async function MarketLandingPage({ params }: PageProps) {
  const { market } = await params;

  if (!isMarket(market)) {
    notFound();
  }

  const config = getBrandConfig("project-a");
  const marketContent = config.markets[market];

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm uppercase text-brand-accent">
          Market {market.toUpperCase()}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          {marketContent.landingTitle}
        </h1>
        <p className="text-zinc-600">{marketContent.landingDescription}</p>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/${market}/products`}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-brand-accent hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          {config.home.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
