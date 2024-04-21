import { useState } from "react";

export const usePaginate = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  return {
    currentPageNumber,
    handlePageChange,
  };
};
