import { clearSessionCookie, getSessionUser } from "@/features/auth/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { isMarket } from "@repo/types";

type PageProps = {
  params: Promise<{ market: string }>;
};

export default async function MarketLandingPage({ params }: PageProps) {
  const { market } = await params;

  if (!isMarket(market)) {
    notFound();
  }

  const user = await getSessionUser();

  async function logoutAction() {
    "use server";

    await clearSessionCookie();
    redirect(`/${market}`);
  }

  const title = market === "ca" ? "Welcome to the Canadian market" : "Welcome";

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="space-y-4">
        <p className="text-sm uppercase">Project A</p>
        <h1 className="text-4xl font-semibold">
          {title} {user ? `, ${user.username}` : ""}
        </h1>
      </section>

      {user ? (
        <section className="flex items-center gap-4">
          <div className="text-sm">
            Signed in as <span className="font-medium">{user.username}</span>(
            {user.role})
          </div>

          <form action={logoutAction}>
            <button className="rounded-md border px-4 py-2">Log out</button>
          </form>
        </section>
      ) : (
        <section className="flex gap-3">
          <Link href={`/${market}/login`} className="rounded-md px-4 py-2">
            Login
          </Link>
        </section>
      )}
    </main>
  );
}
