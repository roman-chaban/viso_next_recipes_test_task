"use client";

import { Recipes } from "@/features/Recipes/Recipes";
import { client } from "@/shared/client/client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function AllRecipesPage() {
  return (
    <QueryClientProvider client={client}>
      <h1 className='text-4xl font-bold text-center text-blue-600 my-4'>
        All Recipes
      </h1>
      <Recipes />
    </QueryClientProvider>
  );
}
