import {
  fetchRandomRecipe,
  fetchRecipesByCategory,
  fetchRecipesByIngredient,
  fetchSearchRecipeByName,
} from "./getRecipes";

import { Meal } from "./types/meal";

export const fetchAllRecipes = async (
  page: number,
  category: string,
  sortOrder: string,
  searchQuery: string
) => {
  let allRecipes: Meal[] = [];

  if (searchQuery) {
    const searchRecipes = await fetchSearchRecipeByName(searchQuery);
    allRecipes = searchRecipes;
  } else {
    const randomRecipe = fetchRandomRecipe();
    const categoryRecipes = fetchRecipesByCategory(category);
    const ingredientRecipes = fetchRecipesByIngredient("Chicken");

    const [random, categoryData, ingredient] = await Promise.all([
      randomRecipe,
      categoryRecipes,
      ingredientRecipes,
    ]);

    allRecipes = [...random, ...categoryData, ...ingredient];
  }

  if (sortOrder === "alphabetical") {
    allRecipes = allRecipes.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
  }

  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return allRecipes.slice(startIndex, endIndex);
};
