"use client";

import { FC, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Meal } from "@/entities/api/types/meal";

const FavoriteRecipes: FC = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Meal[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoritesRecipes") || "[]"
    );
    setFavoriteRecipes(storedFavorites);
  }, []);

  const removeRecipe = (idMeal: string) => {
    setFavoriteRecipes((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (meal) => meal.idMeal !== idMeal
      );
      localStorage.setItem(
        "favoritesRecipes",
        JSON.stringify(updatedFavorites)
      );
      return updatedFavorites;
    });
  };

  const showDescription = (meal: Meal) => {
    setSelectedRecipe(meal);
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div className='text-center text-[3rem] text-gray-500 mt-10'>
        No favorite recipes yet.
      </div>
    );
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
        Favorite Recipes
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {favoriteRecipes.map((meal: Meal, index: number) => (
          <div
            key={`${meal.idMeal}-${index}`}
            className='relative min-h-[20rem] flex flex-col gap-[2rem] bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105'
          >
            <Link href={`/recipe/${meal.idMeal}`}>
              <Image
                priority
                src={meal.strMealThumb}
                width={400}
                height={400}
                alt={meal.strMeal}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {meal.strMeal}
                </h3>
                <p className='text-gray-600'>{meal.strCategory}</p>
                <p className='text-gray-600'>{meal.strArea}</p>
              </div>
            </Link>
            <button
              onClick={() => removeRecipe(meal.idMeal)}
              className='absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors'
            >
              Remove
            </button>
            <button
              onClick={() => showDescription(meal)}
              className='absolute bottom-5 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors'
            >
              Show Description
            </button>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className='fixed inset-0 bg-amber-100 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
            <h2 className='text-2xl font-bold mb-4'>
              {selectedRecipe.strMeal}
            </h2>
            <Image
              src={selectedRecipe.strMealThumb}
              width={400}
              height={400}
              alt={selectedRecipe.strMeal}
              className='w-full h-48 object-cover mb-4'
            />
            <p className='text-gray-700 mb-4'>
              {selectedRecipe.strInstructions}
            </p>
            <button
              onClick={() => setSelectedRecipe(null)}
              className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
