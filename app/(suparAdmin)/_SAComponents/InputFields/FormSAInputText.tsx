import FloatingLabel from "@/components/FloatingLabel";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { useState } from "react";
import InputError from "@/components/InputError";

const FormSAInputText = <T extends FieldValues>({
  inputLabel,
  inputName,
  inputPlaceholder,
  register,
  errors,
  disabled = false,
  mandatory = false,
  value,
}: {
  inputLabel?: string;
  inputName: Path<T>;
  inputPlaceholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  mandatory?: boolean;
  value: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || !!value;

  const registerProps = register(inputName);

  return (
    <div className="mb-3 w-full">
      <div className="relative">
        <input
          disabled={disabled}
          type="text"
          placeholder={inputPlaceholder || ""}
          {...registerProps}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            registerProps.onBlur(e); // keep RHF blur behavior
          }}
          className={`formInputClass placeholder:capitalize disabled:cursor-not-allowed disabled:bg-tableHover bg-white ${
            errors[inputName] ? "border! border-red-500!" : ""
          }`}
        />

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

      <InputError errors={errors} inputName={inputName} />
    </div>
  );
};

export default FormSAInputText;
