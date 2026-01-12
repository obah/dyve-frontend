import { NextResponse } from "next/server";
import { normalizeLimitlessMarket } from "@/lib/normalize/limitless";
import { upsertEvents } from "@/lib/db/upsertEvents";

const LIMITLESS_CATEGORIES_API_URL =
  "https://api.limitless.exchange/markets/categories/count";
const LIMITLESS_MARKETS_BY_CATEGORY_API_URL =
  "https://api.limitless.exchange/markets/active/";

export async function GET() {
  try {
    const categoriesRes = await fetch(LIMITLESS_CATEGORIES_API_URL);
    if (!categoriesRes.ok) {
      throw new Error(`Failed to fetch categories: ${categoriesRes.status}`);
    }
    const categoriesData: ILimitlessMarketsCategoryCountResponse =
      await categoriesRes.json();

    const categoryIds = Object.keys(categoriesData.category);
    const unifiedEvents: IUnifiedEvent[] = [];
    let totalMarketsFetched = 0;

    for (const catId of categoryIds) {
      try {
        const marketsUrl = new URL(
          `${LIMITLESS_MARKETS_BY_CATEGORY_API_URL}${catId}`,
        );
        marketsUrl.searchParams.set("page", "1");
        marketsUrl.searchParams.set("limit", "20");
        marketsUrl.searchParams.set("sortBy", "newest");

        const marketsRes = await fetch(marketsUrl.toString());
        if (!marketsRes.ok) {
          console.error(
            `Failed to fetch markets for category ${catId}: ${marketsRes.status}`,
          );
          continue;
        }

        const marketsData: ILimitlessMarketsCategoryResponse =
          await marketsRes.json();

        if (marketsData.data && Array.isArray(marketsData.data)) {
          for (const market of marketsData.data) {
            const categoryName = market.categories?.[0] || "General";
            const unifiedEvent = normalizeLimitlessMarket(market, categoryName);
            unifiedEvents.push(unifiedEvent);
          }
          totalMarketsFetched += marketsData.data.length;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (err) {
        console.error(`Error processing category ${catId}:`, err);
      }
    }

    if (unifiedEvents.length > 0) {
      await upsertEvents(unifiedEvents);
    }

    return NextResponse.json({
      status: "success",
      categoriesProcessed: categoryIds.length,
      marketsProcessed: totalMarketsFetched,
      marketsUpserted: unifiedEvents.length,
    });
  } catch (error) {
    console.error("Limitless sync error:", error);
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 },
    );
  }
}
