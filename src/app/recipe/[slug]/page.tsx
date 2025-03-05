"use client";
import React, { FC, useEffect, useState } from "react";

import Image from "next/image";

import { fetchRecipeById } from "@/entities/api/getRecipes";

import { Meal as OriginalMeal } from "@/entities/api/types/meal";

interface Meal
  extends Omit<OriginalMeal, `strIngredient${number}` | `strMeasure${number}`> {
  [key: `strIngredient${number}`]: string;
  [key: `strMeasure${number}`]: string;
}

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const RecipePage: FC<RecipePageProps> = ({ params: paramsPromise }) => {
  const [params, setParams] = useState<{ slug: string } | null>(null);
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);
  const [ingredients, setIngredients] = useState<{ [key: string]: number }>({});
  const [recipe, setRecipe] = useState<Meal | null>(null);

  useEffect(() => {
    paramsPromise.then(setParams);
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;

    const fetchRecipe = async () => {
      const recipe = await fetchRecipeById(params.slug);
      if (!recipe) {
        return null;
      }
      return recipe[0];
    };

    const fetchRecipeData = async () => {
      const recipeData = await fetchRecipe();
      if (recipeData) {
        const mappedRecipe: Meal = {
          ...recipeData,
          ...Object.fromEntries(
            Array.from({ length: 20 }, (_, i) => [
              `strIngredient${i + 1}`,
              (recipeData as Meal)[`strIngredient${i + 1}`] || "",
            ])
          ),
          ...Object.fromEntries(
            Array.from({ length: 20 }, (_, i) => [
              `strMeasure${i + 1}`,
              (recipeData as Meal)[`strMeasure${i + 1}`] || "",
            ])
          ),
        };
        setRecipe(mappedRecipe);
      }
    };

    fetchRecipeData();
  }, [params]);

  if (!params || !recipe) {
    return <div>Loading...</div>;
  }

  const { strMeal, strCategory, strArea, strMealThumb, strInstructions } =
    recipe;

  const handleSelectRecipe = () => {
    setSelectedRecipes((prev) => [...prev, recipe]);
    calculateIngredients([...selectedRecipes, recipe]);
  };

  const calculateIngredients = (recipes: Meal[]) => {
    const newIngredients: { [key: string]: number } = {};
    recipes.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) {
          if (newIngredients[ingredient]) {
            newIngredients[ingredient] += parseFloat(measure) || 1;
          } else {
            newIngredients[ingredient] = parseFloat(measure) || 1;
          }
        }
      }
    });
    setIngredients(newIngredients);
  };

  return (
    <div className='p-4'>
      <div className='max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
        <Image
          src={strMealThumb}
          alt={strMeal}
          width={600}
          height={400}
          className='w-full h-64 object-cover'
        />
        <div className='p-6'>
          <h2 className='text-3xl font-semibold mb-2'>{strMeal}</h2>
          <p className='text-lg text-gray-600'>
            {strCategory} - {strArea}
          </p>
          <h3 className='text-xl font-medium mt-4'>Instructions</h3>
          <p className='text-gray-700 whitespace-pre-line'>{strInstructions}</p>
          <button
            onClick={handleSelectRecipe}
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
          >
            Select Recipe
          </button>
        </div>
      </div>
      <div className='mt-6'>
        <h3 className='text-2xl font-medium'>Selected Recipes</h3>
        <ul className='list-disc list-inside'>
          {selectedRecipes.map((recipe, index) => (
            <li key={index} className='text-lg text-gray-800'>
              {recipe.strMeal}
            </li>
          ))}
        </ul>
        <h3 className='text-2xl font-medium mt-4'>Ingredients Needed</h3>
        <ul className='list-disc list-inside mx-auto max-w-md text-left bg-gray-100 p-4 rounded-lg shadow-md'>
          {Object.entries(ingredients).map(([ingredient, amount], index) => (
            <li key={index} className='text-lg text-gray-800 mb-2'>
              <span className='font-semibold text-blue-600'>{ingredient}</span>:{" "}
              {amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipePage;
