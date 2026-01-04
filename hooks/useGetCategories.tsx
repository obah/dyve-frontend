import { useQuery } from "@tanstack/react-query";

interface ICategory {
  id: string;
  label: string;
  slug: string;
}

export const useGetCategories = () =>
  useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/categories").then((res) => res.json()),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
