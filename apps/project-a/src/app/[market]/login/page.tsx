import { getSessionUser } from "@/features/auth/session-cookie";
import {
  createSessionValue,
  setSessionCookie,
} from "@/features/auth/session-cookie";
import { validateCredentials } from "@repo/auth";
import { notFound, redirect } from "next/navigation";
import { isMarket } from "@repo/types";

type PageProps = {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ params, searchParams }: PageProps) {
  const { market } = await params;
  const { error } = await searchParams;

  if (!isMarket(market)) {
    notFound();
  }

  const existingUser = await getSessionUser();

  if (existingUser) {
    redirect(`/${market}`);
  }

  async function loginAction(formData: FormData) {
    "use server";

    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");
    const user = validateCredentials(username, password);

    if (!user) {
      redirect(`/${market}/login?error=invalid-credentials`);
    }

    await setSessionCookie(createSessionValue(user));
    redirect(`/${market}`);
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm uppercase">Project A</p>
        <h1 className="text-3xl font-semibold">Login</h1>
      </div>

      <form action={loginAction} className="mt-8 space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="w-full rounded-md border px-3 py-2"
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
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter your password"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-600">Invalid username or password.</p>
        ) : null}

        <button className="rounded-md px-2 py-1 cursor-pointer bg-indigo-500 text-white">
          Sign in
        </button>
      </form>
    </main>
  );
}
