import Link from "next/link";
import { redirect } from "next/navigation";
import { clearSessionCookie, getSessionUser } from "@/features/auth/session";

type NavbarProps = {
  market: string;
};

const navLinkClassName =
  "rounded-full border border-transparent px-3 py-2 text-sm text-zinc-700 transition hover:bg-brand-accent/10 hover:text-zinc-950";

const actionClassName =
  "rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-brand-accent hover:bg-brand-accent/10";

export async function Navbar({ market }: NavbarProps) {
  const user = await getSessionUser();

  async function logoutAction() {
    "use server";

    await clearSessionCookie();
    redirect(`/${market}`);
  }

  const items = [
    {
      href: `/${market}`,
      id: "home",
      label: "Home",
    },
    {
      href: `/${market}/products`,
      id: "products",
      label: "Products",
    },
  ];

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
            {items.map((item) => (
              <Link key={item.id} href={item.href} className={navLinkClassName}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user ? (
            <>
              <span className="px-3 py-2 text-sm text-zinc-600">
                {user.username} ({user.role})
              </span>
              <form action={logoutAction}>
                <button
                  className={`cursor-pointer ${actionClassName}`}
                  type="submit"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link href={`/${market}/login`} className={actionClassName}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
