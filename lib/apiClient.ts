import axios from "axios";

export const gammaPolymarketApiClient = axios.create({
  baseURL: "https://gamma-api.polymarket.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const kalshiApiClient = axios.create({
  baseURL: "https://api.elections.kalshi.com/trade-api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});
