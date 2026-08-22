"use client";
import { RiSearch2Fill } from "react-icons/ri";

const TableSearch = ({
  onChangeSearch,
  search,
}: {
  onChangeSearch: (search: string) => void;
  search: string;
}) => {
  return (
    <>
      <div className="flex justify-center items-center h-10 border border-borderLine rounded-lg overflow-hidden w-full md:w-62.5 bg-white">
        <div className="pl-2">
          <RiSearch2Fill className="size-6 text-avocado" />
        </div>
        <input
          type="search"
          placeholder="Search....."
          value={search}
          onChange={(e) => {
            if (e.target.value) {
              const value = String(e.target.value);
              onChangeSearch(value.replace(/^\s+/, "").replace(/\s{2,}/g, " "));
            } else {
              onChangeSearch("");
            }
          }}
          // className="py-[6px] px-2 text-font16 border-0 font-medium focus:outline-0 text-darkGrayish w-full  focus:ring-0"
          className="py-1.5 px-2 text-font16 border-0 font-medium focus:outline-0 text-darkOlive w-full focus:ring-0 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:h-4 [&::-webkit-search-cancel-button]:w-4 [&::-webkit-search-cancel-button]:bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%23000000%22%20stroke-width%3d%222%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cline%20x1%3d%2218%22%20y1%3d%226%22%20x2%3d%226%22%20y2%3d%2218%22%3e%3c%2fline%3e%3cline%20x1%3d%226%22%20y1%3d%226%22%20x2%3d%2218%22%20y2%3d%2218%22%3e%3c%2fline%3e%3c%2fsvg%3e')] [&::-webkit-search-cancel-button]:bg-center [&::-webkit-search-cancel-button]:bg-no-repeat [&::-webkit-search-cancel-button]:bg-contain [&::-webkit-search-cancel-button]:cursor-pointer"
        />
      </div>
    </>
  );
};

export default TableSearch;
