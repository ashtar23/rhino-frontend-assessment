import { getMockCampaignBanner } from "@repo/data";
import { isMarket } from "@repo/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const market = request.nextUrl.searchParams.get("market");

  if (!market || !isMarket(market)) {
    return NextResponse.json({ error: "Invalid market" }, { status: 400 });
  }

  return NextResponse.json(getMockCampaignBanner("project-a", market));
}
