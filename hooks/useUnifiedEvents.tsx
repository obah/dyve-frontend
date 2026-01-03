import { useQuery } from "@tanstack/react-query";

export const useUnifiedEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: () => fetch("/api/events").then((res) => res.json()),
    staleTime: 60_000,
  });
