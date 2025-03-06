"use client";

import FavoriteRecipes from "@/features/FavoriteRecipes/ui/FavoriteRecipes";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export default function FavoriteRecipesPage() {
  useDocumentTitle("Next Recipes - Favorite Recipes");

  return <FavoriteRecipes />;
}
