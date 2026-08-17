import React from "react";
import { twMerge } from "tailwind-merge";

const FloatingLabel = ({
  label,
  InputName,
  isFloating,
  hasError,
  isDisabled,
  mandatory,
}: {
  label: string;
  InputName: string;
  isFloating: boolean;
  hasError: boolean;
  isDisabled?: boolean;
  mandatory?: boolean;
}) => {
  return (
    <>
      <label
        htmlFor={InputName}
        className={twMerge(
          "absolute left-3 z-1 origin-left pointer-events-none select-none rounded-sm transition-all duration-200 capitalize",

          isFloating
            ? "top-0 -translate-y-1/2 bg-white px-1 text-font14 font-bold"
            : "top-1/2 -translate-y-1/2 bg-transparent px-0 text-font16 font-bold",

          hasError
            ? isFloating
              ? "text-red!"
              : "text-red/60!"
            : isFloating
              ? "text-darkOlive!"
              : "text-mandalay!",

          isDisabled && "opacity-60",
        )}
      >
        {label}
        {mandatory && <span className="ml-1 text-red-500">*</span>}
      </label>
    </>
  );
};

export default FloatingLabel;
