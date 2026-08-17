import React from "react";
import ButtonLoader from "./ButtonLoader";
import { twMerge } from "tailwind-merge";

const SubmitButton = ({
  isSubmitting,
  btnName,
  disabled,
  btnClassName,
}: {
  isSubmitting: boolean;
  btnName?: string;
  disabled?: boolean;
  btnClassName?: string;
}) => {
  return (
    <>
      <button
        className={twMerge("button", btnClassName)}
        type="submit"
        disabled={isSubmitting || disabled}
      >
        {isSubmitting ? <ButtonLoader /> : (btnName ?? "Submit")}
      </button>
    </>
  );
};

export default SubmitButton;
