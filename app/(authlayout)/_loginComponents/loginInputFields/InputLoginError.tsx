import React from "react";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

type InputLoginErrorProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  inputName: Path<T>;
};

const InputLoginError = <T extends FieldValues>({
  errors,
  inputName,
}: InputLoginErrorProps<T>) => {
  const errorMessage = errors?.[inputName]?.message;

  return errorMessage ? (
    <p className="text-red text-font12 capitalize text-start">
      {String(errorMessage)}
    </p>
  ) : null;
};

export default InputLoginError;
