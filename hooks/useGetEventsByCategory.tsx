import { useQuery } from "@tanstack/react-query";

export const useGetEventsByCategory = (category?: string) =>
  useQuery({
    queryKey: ["events", category],
    queryFn: () => {
      const url = category ? `/api/events?category=${category}` : "/api/events";
      return fetch(url).then((res) => res.json());
    },
    enabled: true, // Always enabled, even if category is undefined (fetches all)
    staleTime: 60_000,
  });
