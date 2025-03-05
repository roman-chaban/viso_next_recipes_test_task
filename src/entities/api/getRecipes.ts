import { Meal } from "./types/meal";

export const fetchRandomRecipe = async (): Promise<Meal[]> => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const data = await response.json();
  if (data.meals) {
    return data.meals as Meal[];
  } else {
    throw new Error("No meals found.");
  }
};

export const fetchRecipeById = async (mealId: string): Promise<Meal[]> => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  if (data.meals) {
    return data.meals as Meal[];
  } else {
    throw new Error("Meal not found.");
  }
};

export const fetchRecipesByCategory = async (
  category: string
): Promise<Meal[]> => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();
  if (data.meals) {
    return data.meals as Meal[];
  } else {
    throw new Error("No meals found.");
  }
};

export const fetchRecipesByIngredient = async (
  ingredient: string
): Promise<Meal[]> => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  if (data.meals) {
    return data.meals as Meal[];
  } else {
    throw new Error("No meals found.");
  }
};

export const fetchSearchRecipeByName = async (
  name: string
): Promise<Meal[]> => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await response.json();
  if (data.meals) {
    return data.meals as Meal[];
  } else {
    throw new Error("No meals found.");
  }
};
