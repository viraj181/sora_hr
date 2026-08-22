import React from "react";
import { twMerge } from "tailwind-merge";

function TableHeader({
  value,
  thIndex,
  totalHeaders,
  action,
}: {
  value?: {
    label: string;
    align?: string;
    width?: string;
    onClick?: () => void;
    headerIcon?: React.ReactNode;
    colSpan?: number;
  };
  thIndex?: number;
  totalHeaders?: number;
  action?: boolean;
}) {
  return (
    <>
      <th
        className={twMerge(
          "px-4 py-1.75 text-darkGrayish text-font12 border-border whitespace-nowrap font-semibold uppercase",
          value?.align || "text-left",
          value?.width,
          value?.onClick && "cursor-pointer",
          action &&
            thIndex &&
            totalHeaders &&
            thIndex >= totalHeaders - 1 &&
            "border-l",
          thIndex === 0 && "rounded-l-xl",
          totalHeaders && thIndex === totalHeaders - 1 && "rounded-r-xl",
        )}
        onClick={value?.onClick}
        colSpan={value?.colSpan || 1}
      >
        <div
          className={twMerge(
            value?.headerIcon && "flex items-center justify-between gap-2",
          )}
        >
          {value?.label}
          {value?.headerIcon && (
            <p className="text-font12 text-cyan">{value?.headerIcon}</p>
          )}
        </div>
      </th>
    </>
  );
}

export default TableHeader;

// <th
//   className={` ${thIndex === 0 ? "px-4" : "px-4"} py-1.75 ${
//     value?.align || "text-left"
//   } text-darkGrayish text-font12 border-border whitespace-nowrap font-semibold uppercase  ${
//     value?.width
//   } ${value?.onClick ? "cursor-pointer" : ""} ${
//     action && thIndex && totalHeaders
//       ? thIndex < totalHeaders - 1
//         ? ""
//         : "border-l"
//       : ""
//   } `}
//   onClick={value?.onClick}
//   colSpan={value?.colSpan || 1}
// >
//   <div
//     className={` ${
//       value?.headerIcon ? "flex items-center gap-2 justify-between" : ""
//     }`}
//   >
//     {value?.label}
//     {value?.headerIcon && (
//       <p className="text-font12 text-cyan">{value?.headerIcon}</p>
//     )}
//   </div>
// </th>
