import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pricesToPercentages(price: string): number {
  return Number(price) * 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function marketBadgeVariant(market: string): TBadgeVariant {
  switch (market.toLowerCase()) {
    case "polymarket":
      return "polymarket";
    case "limitless":
      return "limitless";
    case "kalshi":
      return "kalshi";
    default:
      return "default";
  }
}
