import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DropDownChildren = ({
  children,
  TriggerChildren,
  dropdownSide = "bottom",
  disabled = false,
}: {
  children: React.ReactNode;
  TriggerChildren: React.ReactNode;
  dropdownSide?: "bottom" | "top";
  disabled?: boolean;
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`focus:outline-none disabled:cursor-not-allowed ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        >
          {TriggerChildren}
        </DropdownMenuTrigger>
        <DropdownMenuContent side={dropdownSide || "bottom"}>
          <div className="max-h-37.5 overflow-y-auto overflow-x-hidden horizontalScroll">
            {children}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownChildren;
