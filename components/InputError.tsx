import React from "react";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

type InputErrorProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  inputName: Path<T>;
  manualError?: string;
};

const InputError = <T extends FieldValues>({
  errors,
  inputName,
  manualError,
}: InputErrorProps<T>) => {
  const errorMessage = errors?.[inputName]?.message || manualError;

  return errorMessage ? (
    <p className="text-red text-font12 capitalize text-start">
      {String(errorMessage)}
    </p>
  ) : null;
};

export default InputError;
