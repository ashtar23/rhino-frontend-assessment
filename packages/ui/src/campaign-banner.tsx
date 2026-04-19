import Link from "next/link";
import type { MockCampaignBanner } from "@repo/data";

type CampaignBannerProps = {
  banner: MockCampaignBanner;
};

export const CampaignBanner = ({ banner }: CampaignBannerProps) => {
  return (
    <section className="rounded-2xl border border-dashed border-zinc-300 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm uppercase text-brand-accent">{banner.badge}</p>
          <h2 className="text-2xl font-semibold text-zinc-950">
            {banner.title}
          </h2>
          <p className="text-sm text-zinc-500">{banner.subtitle}</p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs uppercase text-zinc-600">
          {banner.status}
        </span>
      </div>

      <p className="mt-3 text-zinc-600">{banner.message}</p>

      <Link
        href={banner.ctaHref}
        className="mt-4 inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:border-brand-accent hover:bg-brand-accent/10"
      >
        {banner.ctaLabel}
      </Link>
    </section>
  );
};
