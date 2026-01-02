import axios from "axios";

export const gammaPolymarketApiClient = axios.create({
  baseURL: "https://gamma-api.polymarket.com",
  headers: {
    "Content-Type": "application/json",
  },
});
