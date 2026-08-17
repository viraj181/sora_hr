import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaGripLines } from "react-icons/fa6";

const ActionDropDown = ({
  handleDeleteClick,
  handleCredentialClick,
  handelUpdateValue,
  handelUpdateClick,
  handelViewClick,
  dataSize,
  index,
  handleExtraClick,
  ExtraValue,
  viewValue,
  children,
  disabled,
}: {
  index: number;
  dataSize: number;
  handleDeleteClick?: () => void;
  handelUpdateValue?: string;
  handelUpdateClick?: () => void;
  handleCredentialClick?: () => void;
  handelViewClick?: () => void;
  handleExtraClick?: () => void;
  ExtraValue?: string;
  viewValue?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <>
      <div className="relative flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="focus:outline-none"
            disabled={disabled}
          >
            <FaGripLines
              className={`text-font16 text-center font-bold flex justify-center ${
                disabled
                  ? "text-borderLine cursor-not-allowed"
                  : "text-avocado cursor-pointer"
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side={index >= dataSize - 2 && dataSize > 10 ? "top" : "bottom"}
            className="right-0 bg-white drop-shadow-xl border-0! ring-0! p-0 rounded-lg! "
          >
            {handelViewClick && (
              <DropdownMenuItem
                onClick={handelViewClick}
                className="border-b! border-borderLine hover:bg-borderLine flex justify-center items-center py-1.5 px-2 text-font13 text-darkOlive font-medium capitalize text-center"
              >
                {viewValue ? viewValue : "view"}
              </DropdownMenuItem>
            )}
            {handelUpdateClick && (
              <DropdownMenuItem
                onClick={handelUpdateClick}
                className="border-b! border-borderLine hover:bg-borderLine flex justify-center items-center py-1.5 px-2 text-font13 text-darkOlive font-medium capitalize text-center"
              >
                {handelUpdateValue ? handelUpdateValue : "Edit"}
              </DropdownMenuItem>
            )}
            {handleExtraClick && (
              <DropdownMenuItem
                onClick={handleExtraClick}
                className="border-b! border-borderLine hover:bg-borderLine flex justify-center items-center py-1.5 px-2 text-font13 text-darkOlive font-medium capitalize text-center"
              >
                {ExtraValue}
              </DropdownMenuItem>
            )}
            {handleDeleteClick && (
              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="border-b! border-borderLine hover:bg-borderLine flex justify-center items-center py-1.5 px-2 text-font13 text-darkOlive font-medium capitalize text-center"
              >
                Delete
              </DropdownMenuItem>
            )}
            {handleCredentialClick && (
              <DropdownMenuItem
                onClick={handleCredentialClick}
                className="border-b! border-borderLine hover:bg-borderLine flex justify-center items-center py-1.5 px-2 text-font13 text-darkOlive font-medium capitalize text-center"
              >
                Add Credential
              </DropdownMenuItem>
            )}
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default ActionDropDown;
