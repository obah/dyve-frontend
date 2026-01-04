import { redis } from "@/lib/db/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categoriesJson = await redis.smembers("categories:all");
    const categories = categoriesJson.map((c) => JSON.parse(c));

    // Remove duplicates based on slug
    const uniqueCategories = Array.from(
      new Map(categories.map((c: any) => [c.slug, c])).values(),
    ) as { id: string; label: string; slug: string }[];

    // Check event counts for each category pipeline
    const pipeline = redis.pipeline();
    uniqueCategories.forEach((cat) => {
      pipeline.scard(`events:category:${cat.slug}`);
    });
    const results = await pipeline.exec();

    // Filter categories that have at least one event
    const nonEmptyCategories = uniqueCategories
      .filter((_, index) => {
        const count = results?.[index]?.[1] as number;
        return count > 0;
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json(nonEmptyCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
