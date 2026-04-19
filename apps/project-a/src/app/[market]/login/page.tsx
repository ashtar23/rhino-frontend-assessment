import {
  getSessionUser,
  createSessionValue,
  setSessionCookie,
} from "@/features/auth/session";
import { validateCredentials } from "@repo/auth";
import { getBrandConfig } from "@repo/constants";
import { notFound, redirect } from "next/navigation";
import { isMarket, type Market } from "@repo/types";
import { Button } from "@repo/ui";

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
  const config = getBrandConfig("project-a");
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
      {config.features.emphasizeMemberAccess ? (
        <div className="space-y-3">
          {config.login.introLabel ? (
            <p className="text-sm uppercase text-brand-accent">
              {config.login.introLabel}
            </p>
          ) : null}

          <h1 className="text-3xl font-semibold">{config.login.title}</h1>

          {config.login.description ? (
            <p className="text-zinc-600">{config.login.description}</p>
          ) : null}
        </div>
      ) : (
        <h1 className="text-3xl font-semibold">{config.login.title}</h1>
      )}

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

        <Button className="cursor-pointer shrink-0">Sign in</Button>
      </form>
    </main>
  );
}
