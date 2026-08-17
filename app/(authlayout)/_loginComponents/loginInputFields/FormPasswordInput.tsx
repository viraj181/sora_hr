import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import InputLoginError from "./InputLoginError";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import FloatingLabel from "@/components/FloatingLabel";

const FormPasswordInput = <T extends FieldValues>({
  inputLabel,
  inputName,
  inputPlaceholder,
  register,
  errors,
  mandatory,
  disabled,
  value,
}: {
  inputLabel: string;
  inputName: Path<T>;
  inputPlaceholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  mandatory: boolean;
  disabled?: boolean;
  value: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || !!value;

  const registerProps = register(inputName);
  return (
    <>
      <div className="w-full mb-3">
        <div className="relative">
          <input
            disabled={disabled}
            type={showPassword ? "text" : "password"}
            placeholder={inputPlaceholder || ""}
            // {...register(inputname)}
            {...registerProps}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(!!e.target.value);
              registerProps.onBlur(e); // keep RHF blur behavior
            }}
            className={`formInputClass placeholder:capitalize disabled:bg-tableHover disabled:cursor-not-allowed bg-white ${
              errors[inputName] ? "border! border-red!" : ""
            } `}
          />
          <div className="absolute right-2 top-2">
            <a
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="h-full flex items-center text-gray-500"
            >
              {showPassword ? (
                <IoEyeOffSharp className=" text-cyan size-6 " />
              ) : (
                <IoEye className=" text-cyan size-6 " />
              )}
            </a>
          </div>
          {inputLabel && (
            <FloatingLabel
              label={inputLabel}
              InputName={String(inputName)}
              isFloating={isFloating}
              hasError={!!errors?.[inputName]?.message}
              isDisabled={disabled}
              mandatory={mandatory}
            />
          )}
        </div>
        <InputLoginError errors={errors} inputName={inputName} />
      </div>
    </>
  );
};

export default FormPasswordInput;
