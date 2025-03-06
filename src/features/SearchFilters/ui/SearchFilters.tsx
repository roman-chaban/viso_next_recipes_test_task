import { FC } from "react";

interface SearchFiltersProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchFilters: FC<SearchFiltersProps> = ({
  category,
  setCategory,
  sortOrder,
  setSortOrder,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className='flex justify-between mb-4 max-[38.5rem]:flex-col gap-4'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search recipes...'
        className='px-4 py-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <div className='flex items-center gap-4'>
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
    </div>
  );
};
