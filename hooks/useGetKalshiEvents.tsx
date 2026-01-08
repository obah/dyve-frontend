import { kalshiApiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

const getKalshi = async () => {
  const { data } = await kalshiApiClient.get("/markets?limit=100");

  return data;
};

export const useGetKalshiEvents = () =>
  useQuery({
    queryKey: ["kalshi_events"],
    queryFn: getKalshi,
  });
