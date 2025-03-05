"use client";

import { Recipes } from "@/features/Recipes/Recipes";
import { client } from "@/shared/client/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

export default function Home() {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />

      <Recipes />
    </QueryClientProvider>
  );
}
