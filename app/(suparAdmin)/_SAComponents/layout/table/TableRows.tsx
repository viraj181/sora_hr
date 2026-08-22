import { EmptyDataCheck } from "@/components/EmptyDataCheck";
import React from "react";
import { twMerge } from "tailwind-merge";

function TableRows({
  cell,
  thIndex,
  totalHeaders,
  action = false,
  isDisabled,
}: {
  cell?: string | React.ReactNode;
  thIndex: number;
  totalHeaders: number;
  action?: boolean;
  isDisabled?: boolean;
}) {
  return (
    <td
      className={twMerge(
        "px-4 py-1.5 text-left text-darkOlive text-font13 whitespace-nowrap font-medium",
        isDisabled && "bg-gray-100",
        thIndex === 0 && "rounded-l-xl",
        totalHeaders && thIndex === totalHeaders - 1 && "rounded-r-xl",
      )}
    >
      {EmptyDataCheck(cell) || <span className="tracking-[-0.2em]">--</span>}
    </td>
  );
}

export default TableRows;
// <td className="rounded-l-xl px-4 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
//   {item.adminId}
// </td>;
//  <td
//    className={` ${
//      thIndex === 0 ? "px-4 py-1.5" : ""
//    } text-left text-darkGrayish text-font13  border-border whitespace-nowrap font-medium ${
//      action && thIndex && totalHeaders
//        ? thIndex === totalHeaders - 1
//          ? `border-l p-0 px-0 py-0 h-full  ${isDisabled ? "bg-gray-100" : ""}`
//          : "px-4 py-1.5"
//        : "px-4 py-1.5"
//    } `}
//  >
//    {EmptyDataCheck(cell) || <span className="tracking-[-0.2em]">--</span>}
//  </td>;
