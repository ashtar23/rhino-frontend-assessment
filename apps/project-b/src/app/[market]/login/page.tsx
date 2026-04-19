import { notFound, redirect } from "next/navigation";
import { validateCredentials } from "@repo/auth";
import { isMarket, type Market } from "@repo/types";
import {
  createSessionValue,
  getSessionUser,
  setSessionCookie,
} from "@/features/auth/session";

type PageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ error?: string }>;
};

export async function submitLogin(market: Market, formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const user = validateCredentials(username, password);

  if (!user) {
    redirect(`/${market}/login?error=invalid-credentials`);
  }

  await setSessionCookie(createSessionValue(user));
  redirect(`/${market}`);
}

export default async function LoginPage({ params, searchParams }: PageProps) {
  const { market } = await params;
  const { error } = await searchParams;

  if (!isMarket(market)) {
    notFound();
  }

  const resolvedMarket: Market = market;
  const existingUser = await getSessionUser();

  if (existingUser) {
    redirect(`/${resolvedMarket}`);
  }

  async function loginAction(formData: FormData) {
    "use server";

    await submitLogin(resolvedMarket, formData);
  }

  return (
    <main className="mx-auto max-w-md px-6 py-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-accent">
          Member access
        </p>
        <h1 className="text-3xl font-semibold">Sign in to Project B</h1>
        <p className="text-zinc-600">
          Access extended product details and market-specific catalogue data.
        </p>
      </div>

      <form action={loginAction} className="mt-8 space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm font-medium"
            placeholder="Enter your username"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm font-medium"
            placeholder="Enter your password"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-600">Invalid username or password.</p>
        ) : null}

        <button className="cursor-pointer shrink-0 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-brand-accent hover:bg-brand-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2">
          Sign in
        </button>
      </form>
    </main>
  );
}
