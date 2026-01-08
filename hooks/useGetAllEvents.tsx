import { useQuery } from "@tanstack/react-query";

export const useAllEvents = () =>
  useQuery({
    queryKey: ["all_events"],
    queryFn: () => {
      const polymarketData = fetch("/api/cron/polymarket").then((res) =>
        res.json(),
      );
      //   const kalshiData = fetch("/api/cron/kalshi").then((res) => res.json());

      return {
        polymarket: polymarketData,
        // kalshi: kalshiData,
      };
    },
  });
