import { FC, useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks/useDebounce";

import { fetchAllRecipes } from "@/entities/api/fetchAllRecipes";

import { Meal } from "@/entities/api/types/meal";

import { SearchFilters } from "@/features/SearchFilters/ui/SearchFilters";
import { RecipeCard } from "@/features/RecipeCard/ui/RecipeCard";
import { Pagination } from "@/features/Pagination/Pagination";
import { SelectedRecipesModal } from "@/features/SelectedRecipesModal/ui/SelectedRecipesModal";

export const Recipes: FC = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("Seafood");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allRecipes", page, category, sortOrder, debouncedSearchQuery],
    queryFn: () =>
      fetchAllRecipes(page, category, sortOrder, debouncedSearchQuery),
  });

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [page]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteToggle = (id: number, meal: Meal) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favorite) => favorite !== id)
        : [...prevFavorites, id];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });

    let storedFavorites = JSON.parse(
      localStorage.getItem("favoritesRecipes") || "[]"
    );

    if (!favorites.includes(id)) {
      storedFavorites.push(meal);
    } else {
      storedFavorites = storedFavorites.filter(
        (favorite: Meal) => favorite.idMeal !== meal.idMeal
      );
    }

    localStorage.setItem("favoritesRecipes", JSON.stringify(storedFavorites));
  };

  const handleRecipeSelect = (meal: Meal) => {
    setSelectedRecipes((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) => selected.idMeal === meal.idMeal
      );
      if (isSelected) {
        return prevSelected.filter(
          (selected) => selected.idMeal !== meal.idMeal
        );
      } else {
        return [...prevSelected, meal];
      }
    });
  };

  const calculateIngredients = () => {
    const ingredients: { [key: string]: number } = {};

    selectedRecipes.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
          if (!ingredients[ingredient]) {
            ingredients[ingredient] = 0;
          }
          ingredients[ingredient] += parseFloat(measure) || 1;
        }
      }
    });

    return ingredients;
  };

  const totalIngredients = calculateIngredients();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12'></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='p-4'>
      <SearchFilters
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className='m-6 ml-0 px-4 py-2 bg-blue-500 text-white rounded-md'
      >
        Show Selected Recipes
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data?.map((meal, index) => (
          <RecipeCard
            key={`${meal.idMeal}-${index}`}
            meal={meal}
            isFavorite={favorites.includes(Number(meal.idMeal))}
            onFavoriteToggle={() =>
              handleFavoriteToggle(Number(meal.idMeal), meal)
            }
            isSelected={selectedRecipes.some(
              (selected) => selected.idMeal === meal.idMeal
            )}
            onSelect={() => handleRecipeSelect(meal)}
          />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={7} />
      {isModalOpen && (
        <SelectedRecipesModal
          selectedRecipes={selectedRecipes}
          totalIngredients={totalIngredients}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
