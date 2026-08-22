// import Image from "next/image";
// import React from "react";
// import previous from "@/Images/previous.svg";
// import Next from "@/Images/Next.svg";
// import FirstPagePagination from "@/Images/FirstPagePagination.svg";
// import LastPagePagination from "@/Images/LastPagePagination.svg";

import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const Pagination = ({
  dataLength,
  totalItems,
  totalPages,
  pageNumber,
  onClickPagination,
}: {
  dataLength: number;
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  onClickPagination: (page: number) => void;
}) => {
  const startItem = (pageNumber - 1) * dataLength + 1;
  const endItem = Math.min(pageNumber * dataLength, totalItems);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Render first page
    pageNumbers.push(
      <button
        key={1}
        onClick={() => onClickPagination(1)}
        disabled={pageNumber === 1}
        className={` ${
          pageNumber === 1
            ? "text-white bg-avocado rounded-full font-bold"
            : `text-darkOlive font-semibold hover:text-avocado`
        } flex justify-center items-center w-6 h-6 text-font14  cursor-pointer disabled:cursor-not-allowed`}
      >
        {1}
      </button>,
    );

    // Render ellipsis if necessary
    if (pageNumber > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-1">
          ...
        </span>,
      );
    }

    // Render page numbers around the current page
    const startPage = Math.max(2, pageNumber - 1);
    const endPage = Math.min(totalPages - 1, pageNumber + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onClickPagination(i)}
          className={` ${
            pageNumber === i
              ? "text-white bg-avocado rounded-full font-bold"
              : `text-darkOlive font-semibold hover:text-avocado`
          } flex justify-center items-center w-6 h-6 text-font14  cursor-pointer disabled:cursor-not-allowed`}
        >
          {i}
        </button>,
      );
    }
    // Render ellipsis if necessary
    if (pageNumber < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-1">
          ...
        </span>,
      );
    }
    // Render last page
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onClickPagination(totalPages)}
          disabled={pageNumber === totalPages}
          className={` ${
            pageNumber === totalPages
              ? "text-white bg-avocado rounded-full font-bold"
              : `text-darkOlive font-semibold hover:text-avocado`
          } flex justify-center items-center w-6 h-6 text-font14  cursor-pointer disabled:cursor-not-allowed`}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center md:justify-between items-center h-10 w-full px-5 capitalize">
      {dataLength > 0 ? (
        <p className="text-font14 font-semibold hidden md:block">
          Showing {startItem}-{endItem} of {totalItems}
        </p>
      ) : (
        <p className="text-font14">!Oop&apos;s no data found</p>
      )}
      {totalItems > 20 && totalPages > 1 && (
        <div className="flex justify-end gap-2">
          <div className="flex items-center gap-2 justify-end">
            {/* Jump to First Page */}
            {/* <button
              type="button"
              className=" cursor-pointer rounded flex justify-center items-center w-[25px] h-[25px] p-1 bg-cyan disabled:cursor-not-allowed disabled:text-darkGrayish text-darkGrayish"
              onClick={() => onClickPagination(1)}
              disabled={pageNumber === 1}
            >
              <Image
                src={FirstPagePagination}
                alt="First Page"
                width={12}
                height={12}
                className="w-full h-full"
              />
            </button> */}
            <button
              type="button"
              className=" cursor-pointer rounded flex justify-center items-center w-6 h-6 bg-cyan disabled:cursor-not-allowed disabled:text-darkOlive text-darkOlive hover:text-avocado"
              onClick={() => onClickPagination(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              <BsFillCaretLeftFill size={16} />

              {/* <Image
                src={previous}
                alt="previous page"
                width={12}
                height={12}
                className="w-full h-full"
              /> */}
            </button>
            {renderPageNumbers()}
            <button
              type="button"
              className=" cursor-pointer rounded flex justify-center items-center w-6 h-6 bg-cyan disabled:cursor-not-allowed disabled:text-darkOlive text-darkOlive hover:text-avocado"
              onClick={() => onClickPagination(pageNumber + 1)}
              disabled={pageNumber === totalPages || pageNumber >= totalPages}
            >
              <BsFillCaretRightFill size={16} />
              {/* <Image
                src={Next}
                alt="next page"
                width={12}
                height={12}
                className="w-full h-full"
              /> */}
            </button>
            {/* Jump to Last Page */}
            {/* <button
              type="button"
              className=" cursor-pointer rounded flex justify-center items-center w-[25px] h-[25px] p-1  bg-cyan disabled:cursor-not-allowed disabled:text-darkGrayish text-darkGrayish"
              onClick={() => onClickPagination(totalPages)}
              disabled={pageNumber === totalPages}
            >
              <Image
                src={LastPagePagination}
                alt="last page"
                width={12}
                height={12}
                className="w-full h-full"
              />
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
