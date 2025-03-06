"use client";

import { Recipes } from "@/features/Recipes/ui/Recipes";
import { client } from "@/shared/client/client";
import { QueryClientProvider } from "@tanstack/react-query";

import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export default function AllRecipesPage() {
  useDocumentTitle("Next Recipes - All Recipes");
  return (
    <QueryClientProvider client={client}>
      <h1 className='text-4xl font-bold text-center text-blue-950-600 my-4'>
        All Recipes
      </h1>
      <Recipes />
    </QueryClientProvider>
  );
}
