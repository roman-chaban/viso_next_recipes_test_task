import { FC, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks/useDebounce";
import Image from "next/image";
import Link from "next/link";
import { fetchAllRecipes } from "@/entities/api/fetchAllRecipes";
import { Meal } from "@/entities/api/types/meal";

export const Recipes: FC = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("Seafood");
  const [sortOrder, setSortOrder] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

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

  const renderPageNumbers = () => {
    const totalPages = 7;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded-md ${
              i === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === page - 2 || i === page + 2) {
        pageNumbers.push(
          <span key={i} className='px-3 py-1'>
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

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
      <div className='flex justify-between mb-4'>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='px-4 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='Seafood'>Seafood</option>
          <option value='Chicken'>Chicken</option>
          <option value='Beef'>Beef</option>
          <option value='Vegetarian'>Vegetarian</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className='px-4 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='default'>Default</option>
          <option value='alphabetical'>Alphabetical</option>
        </select>
      </div>
      <div className='flex mb-4'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search recipes...'
          className='px-4 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data?.map((meal, index) => (
          <div key={`${meal.idMeal}-${index}`} className='relative'>
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
              onClick={() => handleFavoriteToggle(Number(meal.idMeal), meal)}
              className={`absolute top-2 right-2 px-3 py-1 rounded-full ${
                favorites.includes(Number(meal.idMeal))
                  ? "bg-red-500 text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {favorites.includes(Number(meal.idMeal))
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
      <div className='flex justify-center gap-2 mt-6'>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className='px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50'
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, 7))}
          disabled={page === 7}
          className='px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
};
