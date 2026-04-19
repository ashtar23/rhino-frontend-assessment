import Link from "next/link";
import { redirect } from "next/navigation";
import { getBrandConfig } from "@repo/constants";
import { Button } from "@repo/ui";
import { clearSessionCookie, getSessionUser } from "@/features/auth/session";

type NavbarProps = {
  market: string;
};

type NavItem = {
  href: string;
  id: string;
  label: string;
};

const navLinkClassName =
  "rounded-full border border-transparent px-3 py-2 text-sm text-zinc-300 transition hover:border-brand-accent hover:bg-brand-accent/10 hover:text-white";

const getItems = (market: string): NavItem[] => [
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

export async function Navbar({ market }: NavbarProps) {
  const config = getBrandConfig("project-b");
  const user = await getSessionUser();
  const items = getItems(market);

  async function logoutAction() {
    "use server";

    await clearSessionCookie();
    redirect(`/${market}`);
  }

  return (
    <header className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-950 px-5 py-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href={`/${market}`}
            className="text-sm font-semibold uppercase text-white"
          >
            {config.navbar.brandLabel}
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
              <span className="px-3 py-2 text-sm text-zinc-400">
                {user.username} ({user.role})
              </span>
              <form action={logoutAction}>
                <Button
                  className="cursor-pointer"
                  type="submit"
                  variant="inverse"
                >
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <Button href={`/${market}/login`} variant="inverse">
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
