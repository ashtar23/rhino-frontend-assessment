import { notFound } from "next/navigation";
import { getBrandConfig } from "@repo/constants";
import { isMarket } from "@repo/types";
import { Button } from "@repo/ui";

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
        <Button href={`/${market}/products`}>{config.home.ctaLabel}</Button>
      </div>
    </section>
  );
}
