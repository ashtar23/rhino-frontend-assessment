import type { MockCampaignBanner } from "@repo/data";
import { Button } from "./button";

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

      <Button href={banner.ctaHref} className="mt-4 inline-flex">
        {banner.ctaLabel}
      </Button>
    </section>
  );
};
