"use client";
import React, { useCallback, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { useOnClickOutside } from "usehooks-ts";

const PageSize = ({
  limit,
  totalItems,
  onclickLimit,
}: {
  limit: number;
  totalItems: number;
  onclickLimit: (limit: number) => void;
}) => {
  const pageNumber = useRef<HTMLButtonElement>(null);

  const [actionPage, setActionPage] = useState("");

  const handelLimit = useCallback(() => {
    if (actionPage === "limit") {
      setActionPage("");
    } else {
      setActionPage("limit");
    }
  }, [setActionPage, actionPage]);

  const handleClickOutside = () => {
    setActionPage("");
  };
  useOnClickOutside(
    pageNumber as React.RefObject<HTMLElement>,
    handleClickOutside,
  );

  return (
    <>
      {totalItems > 20 ? (
        <button
          ref={pageNumber}
          onClick={handelLimit}
          type="button"
          className="relative w-fit px-2 h-10 border-r  border-borderLine "
        >
          <div className="flex justify-center items-center gap-1.5 ">
            <p className="font-medium text-font14 text-darkOlive ">{limit}</p>
            <FaCaretDown
              className={twMerge(
                "size-5 text-avocado transition-all duration-300",
                actionPage === "limit" && "rotate-180",
              )}
            />
          </div>
          {actionPage === "limit" && (
            <div
              className="absolute bottom-10 w-full left-0 right-0  bg-white shadow-lg drop-shadow-xl"
              style={{ zIndex: "3" }}
            >
              <ul className="m-0 p-0 bg-white border border-borderLine ">
                {[20, 30, 50, 100].map(
                  (item: number, index: number, array: number[]) => (
                    <li
                      key={item}
                      onClick={(e) => {
                        e.stopPropagation();
                        onclickLimit(item);
                        setActionPage("");
                      }}
                      className={`block ${
                        array.length - 1 === index ? "" : "border-b"
                      } text-center border-borderLine px-3.5  text-font13 font-medium text-darkOlive cursor-pointer py-1.5 hover:bg-lightGreen`}
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </button>
      ) : (
        <>
          <p className="invisible"></p>
        </>
      )}
    </>
  );
};

export default PageSize;
