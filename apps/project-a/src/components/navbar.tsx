import Link from "next/link";
import { redirect } from "next/navigation";
import type { Market } from "@repo/types";
import {
  clearSessionCookie,
  getSessionUser,
} from "@/features/auth/session-cookie";

type NavbarProps = {
  market: Market;
};

const navLinkClassName =
  "rounded-full px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950";

export const Navbar = async ({ market }: NavbarProps) => {
  const user = await getSessionUser();

  async function logoutAction() {
    "use server";

    await clearSessionCookie();
    redirect(`/${market}`);
  }

  return (
    <header className="mb-8 rounded-2xl border border-zinc-200 bg-white/90 px-4 py-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href={`/${market}`}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-900"
          >
            Project A
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <Link href={`/${market}`} className={navLinkClassName}>
              Home
            </Link>
            <Link href={`/${market}/products`} className={navLinkClassName}>
              Products
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              <span className="px-3 py-2 text-sm text-zinc-600">
                {user.username} ({user.role})
              </span>

              <form action={logoutAction}>
                <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 cursor-pointer">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link
              href={`/${market}/login`}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
