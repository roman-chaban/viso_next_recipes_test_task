import { QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});
