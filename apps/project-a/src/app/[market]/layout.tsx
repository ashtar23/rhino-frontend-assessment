import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isMarket } from "@repo/types";
import { Navbar } from "@/components/navbar";

type MarketLayoutProps = {
  children: ReactNode;
  params: Promise<{ market: string }>;
};

export default async function MarketLayout({
  children,
  params,
}: MarketLayoutProps) {
  const { market } = await params;

  if (!isMarket(market)) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <Navbar market={market} />
        {children}
      </div>
    </main>
  );
}
