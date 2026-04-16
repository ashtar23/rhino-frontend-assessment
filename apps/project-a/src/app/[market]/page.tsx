import Link from "next/link";
import { notFound } from "next/navigation";

type Market = "en" | "ca";

const isMarket = (value: string): value is Market => {
  return value === "en" || value === "ca";
};

type PageProps = {
  params: Promise<{ market: string }>;
};

export default async function MarketLandingPage({ params }: PageProps) {
  const { market } = await params;

  if (!isMarket(market)) {
    notFound();
  }

  const title = market === "ca" ? "Welcome to the Canadian market" : "Welcome";

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="space-y-4">
        <p className="text-sm uppercase text-muted-foreground">Project A</p>
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      </section>

      <section className="flex gap-3">
        <Link
          href={`/${market}/login`}
          className="rounded-md bg-foreground px-4 py-2 text-background"
        >
          Login
        </Link>
        <Link
          href={`/${market}/products`}
          className="rounded-md border px-4 py-2"
        >
          Browse products
        </Link>
      </section>
    </main>
  );
}
