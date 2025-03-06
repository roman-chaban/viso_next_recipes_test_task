import { FC } from "react";

import { Meal } from "@/entities/api/types/meal";

interface SelectedRecipesModalProps {
  selectedRecipes: Meal[];
  totalIngredients: { [key: string]: number };
  onClose: () => void;
}

export const SelectedRecipesModal: FC<SelectedRecipesModalProps> = ({
  selectedRecipes,
  totalIngredients,
  onClose,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-amber-100 bg-opacity-50'>
      <div className='bg-white p-6 rounded-md w-11/12 md:w-1/2 lg:w-1/3'>
        <h2 className='text-xl font-semibold'>Selected Recipes</h2>
        <ul className='list-disc list-inside'>
          {selectedRecipes.map((meal) => (
            <li key={meal.idMeal}>{meal.strMeal}</li>
          ))}
        </ul>
        <h2 className='text-xl font-semibold mt-4'>Total Ingredients</h2>
        <ul className='list-disc list-inside'>
          {Object.entries(totalIngredients).map(([ingredient, amount]) => (
            <li key={ingredient}>
              {ingredient}: {amount}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
        >
          Close
        </button>
      </div>
    </div>
  );
};
