import { redis } from "@/lib/db/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const slugs = await redis.smembers("categories:all");

    if (!slugs.length) {
      return NextResponse.json([]);
    }

    const pipeline = redis.pipeline();
    slugs.forEach((slug) => {
      pipeline.get(`category:${slug}`);
      pipeline.sinter(`events:category:${slug}`, "events:polymarket:active");
      pipeline.sinter(`events:category:${slug}`, "events:kalshi:active");
      pipeline.sinter(`events:category:${slug}`, "events:limitless:active");
    });

    const results = await pipeline.exec();

    const categories: { id: string; label: string; slug: string }[] = [];

    for (let i = 0; i < results.length; i += 4) {
      const catData = results[i];
      const pmKeys = results[i + 1] as string[];
      const kKeys = results[i + 2] as string[];
      const lKeys = results[i + 3] as string[];

      const count =
        (pmKeys?.length || 0) + (kKeys?.length || 0) + (lKeys?.length || 0);

      if (count > 0 && catData) {
        let category;
        if (typeof catData === "object") {
          category = catData;
        } else {
          try {
            category = JSON.parse(catData as string);
          } catch (e) {
            console.error(
              `Failed to parse category data for index ${i}`,
              catData,
            );
            continue;
          }
        }
        categories.push(category);
      }
    }

    const sortedCategories = categories.sort((a, b) =>
      a.label.localeCompare(b.label),
    );

    return NextResponse.json(sortedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
