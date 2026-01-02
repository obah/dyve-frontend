import { fetchActiveEvents } from "@/app/actions/polymarket";
import { useQuery } from "@tanstack/react-query";

export const useFetchActiveEvents = () => {
  return useQuery({
    queryKey: ["active-events"],
    queryFn: () => fetchActiveEvents(),
    refetchInterval: 3600,
    refetchOnWindowFocus: false,
    staleTime: 3600,
  });
};
