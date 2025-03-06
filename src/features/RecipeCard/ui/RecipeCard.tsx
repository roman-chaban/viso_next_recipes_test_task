import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Meal } from "@/entities/api/types/meal";

interface RecipeCardProps {
  meal: Meal;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  isSelected: boolean;
  onSelect: () => void;
}

export const RecipeCard: FC<RecipeCardProps> = ({
  meal,
  isFavorite,
  onFavoriteToggle,
  isSelected,
  onSelect,
}) => {
  return (
    <div className='relative bg-white min-h-[18rem] rounded-lg shadow-lg overflow-hidden'>
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
          <h3 className='text-lg font-semibold'>{meal.strMeal}</h3>
          <p className='text-gray-600'>{meal.strCategory}</p>
          <p className='text-gray-600'>{meal.strArea}</p>
        </div>
      </Link>
      <button
        onClick={onFavoriteToggle}
        className={`absolute top-2 right-2 px-3 py-1 rounded-full shadow-md ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-500 text-white"
        }`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <button
        onClick={onSelect}
        className={`absolute bottom-2 right-2 px-3 py-1 rounded-full shadow-md ${
          isSelected ? "bg-green-500 text-white" : "bg-gray-500 text-white"
        }`}
      >
        {isSelected ? "Deselect" : "Select"}
      </button>
    </div>
  );
};
