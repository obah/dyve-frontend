"use server";

import { gammaPolymarketApiClient } from "@/lib/apiClient";
import { pricesToPercentages } from "@/lib/utils";

export const fetchActiveEvents = async (): Promise<
  GammaPolymarketEventResponse[]
> => {
  try {
    const url = "/events?active=true&closed=false&limit=5";
    const { data } =
      await gammaPolymarketApiClient.get<GammaPolymarketEventResponse[]>(url);

    return data;
  } catch (error) {
    console.error("Error fetching active events:", error);
    throw new Error("Failed to fetch active events");
  }
};
