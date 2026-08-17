import React from "react";
import ButtonLoader from "./ButtonLoader";
import { twMerge } from "tailwind-merge";

const BaseButton = ({
  btnName,
  isSubmitting,
  disabled,
  onBaseButtonClick,
  btnClassName,
}: {
  btnName: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  onBaseButtonClick?: () => void;
  btnClassName?: string;
}) => {
  return (
    <>
      <button
        className={twMerge("button", btnClassName)}
        type="button"
        disabled={isSubmitting || disabled}
        onClick={onBaseButtonClick}
      >
        {isSubmitting ? <ButtonLoader /> : btnName}
      </button>
    </>
  );
};

export default BaseButton;
