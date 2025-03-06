import { FC } from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const renderPageNumbers = () => {
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

  return (
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
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className='px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};
