import { getMockCampaignBanner } from "./mock-campaign-banner";

describe("getMockCampaignBanner", () => {
  it("returns a project-specific banner for project-a", () => {
    expect(getMockCampaignBanner("project-a", "en")).toEqual(
      expect.objectContaining({
        badge: "Preview drop",
        ctaHref: "/en/login?preview=studio-drop",
        ctaLabel: "Join preview access",
        status: "coming-soon",
        subtitle: "English market campaign preview",
        title: "Studio Drop capsule",
      }),
    );
  });

  it("returns a market-specific banner for project-b", () => {
    expect(getMockCampaignBanner("project-b", "ca")).toEqual(
      expect.objectContaining({
        badge: "Early access",
        ctaHref: "/ca/login?preview=field-kit",
        ctaLabel: "Unlock early access",
        status: "preview",
        subtitle: "Canadian market campaign preview",
        title: "Field Kit release",
      }),
    );
  });
});
