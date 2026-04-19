import type { ComponentPropsWithoutRef } from "react";
import { render, screen } from "@testing-library/react";
import type { MockCampaignBanner } from "@repo/data";
import { CampaignBanner } from "./campaign-banner";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const banner: MockCampaignBanner = {
  badge: "Preview drop",
  ctaHref: "/en/login?preview=studio-drop",
  ctaLabel: "Join preview access",
  message: "Simulated campaign data for an unreleased drop.",
  status: "coming-soon",
  subtitle: "English market campaign preview",
  title: "Studio Drop capsule",
};

describe("CampaignBanner", () => {
  it("renders the shared campaign content and CTA", () => {
    render(<CampaignBanner banner={banner} />);

    expect(screen.getByText("Preview drop")).toBeInTheDocument();
    expect(screen.getByText("Studio Drop capsule")).toBeInTheDocument();
    expect(
      screen.getByText("English market campaign preview"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Simulated campaign data for an unreleased drop."),
    ).toBeInTheDocument();
    expect(screen.getByText("coming-soon")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Join preview access" }),
    ).toHaveAttribute("href", "/en/login?preview=studio-drop");
  });
});
