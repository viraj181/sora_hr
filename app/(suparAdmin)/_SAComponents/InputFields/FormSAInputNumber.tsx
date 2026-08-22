"use client";

import FloatingLabel from "@/components/FloatingLabel";
import InputError from "@/components/InputError";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";

const FormSAInputNumber = <T extends FieldValues>({
  inputLabel,
  inputName,
  inputPlaceholder,
  control,
  errors,
  mandatory = false,
  disabled = false,
  manualError,
  maxLength,
  decimalScale = 0,
  thousandSeparator = false,
  onChange,
  maxValue,
}: {
  inputLabel: string;
  inputName: Path<T>;
  inputPlaceholder?: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  mandatory?: boolean;
  manualError?: string;
  maxLength?: number;
  decimalScale?: number;
  thousandSeparator?: boolean;
  onChange?: (values: number | undefined) => void;
  maxValue?: number;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-3 w-full">
      <div className="relative">
        <Controller
          control={control}
          name={inputName}
          render={({ field }) => {
            const isFloating = isFocused || !!field.value || field.value === 0;
            return (
              <>
                <NumericFormat
                  value={field.value ?? ""}
                  disabled={disabled}
                  thousandSeparator={thousandSeparator}
                  decimalScale={decimalScale}
                  fixedDecimalScale={false}
                  allowNegative={false}
                  inputMode="decimal"
                  placeholder={inputPlaceholder}
                  getInputRef={field.ref}
                  className={`formInputClass placeholder:capitalize ${
                    errors[inputName] || manualError
                      ? "border! border-red!"
                      : ""
                  }`}
                  onChange={(values) => {
                    field.onChange(values.target.value ?? null);
                    onChange?.(Number(values.target.value));
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    field.onBlur();
                  }}
                  maxLength={maxLength}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    if (!maxValue) return true;
                    return (
                      floatValue === undefined ||
                      (floatValue >= 0 && floatValue <= maxValue)
                    );
                  }}
                  onWheel={(e) => {
                    e.currentTarget.blur();
                  }}
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
              </>
            );
          }}
        />
      </div>

      <InputError
        errors={errors}
        inputName={inputName}
        manualError={manualError}
      />
    </div>
  );
};

export default FormSAInputNumber;
// import FloatingLabel from "@/components/FloatingLabel";
// import InputError from "@/components/InputError";
// import React, { useState } from "react";
// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
// } from "react-hook-form";

// const FormSAInputNumber = <T extends FieldValues>({
//   inputLabel,
//   inputName,
//   inputPlaceholder,
//   register,
//   errors,
//   mandatory = false,
//   disabled = false,
//   manualError,
//   maxLength,
//   onChange,
//   value,
// }: {
//   inputLabel: string;
//   inputName: Path<T>;
//   inputPlaceholder?: string;
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   disabled?: boolean;
//   mandatory?: boolean;
//   manualError?: string;
//   maxLength?: number;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   value: string;
// }) => {
//   const [isFocused, setIsFocused] = useState(false);

//   const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
//     event?.currentTarget?.blur();
//   };

//   const registerProps = register(inputName, {
//     setValueAs: (value) =>
//       value === "" || isNaN(value) ? null : parseFloat(value),
//   });

//   const isFloating = isFocused || !!value;

//   return (
//     <>
//       <div className="mb-3 w-full">
//         <div className="relative">
//           <input
//             disabled={disabled}
//             type="number"
//             inputMode="decimal"
//             placeholder={inputPlaceholder || ""}
//             {...registerProps}
//             onChange={(e) => {
//               const value = e.target.value;

//               // allow empty or valid 2-decimal numbers only
//               if (!/^\d*\.?\d{0,2}$/.test(value)) {
//                 e.target.value = value.slice(0, -1);
//               }

//               registerProps.onChange(e);
//               onChange?.(e);
//             }}
//             onFocus={() => setIsFocused(true)}
//             onBlur={(e) => {
//               setIsFocused(!!e.target.value);
//               registerProps.onBlur(e); // keep RHF blur behavior
//             }}
//             step="0.01"
//             className={`formInputClass placeholder:capitalize ${
//               errors[inputName] || manualError ? "border! border-red-500!" : ""
//             }`}
//             onWheel={handleWheel}
//             onInput={(e) => {
//               const target = e.target as HTMLInputElement;
//               if (maxLength && target.value.length > maxLength) {
//                 target.value = target.value.slice(0, maxLength);
//               }
//             }}
//             onKeyDown={(e) => {
//               // up arrow key and down arrow key
//               const keys = [
//                 "-",
//                 "+",
//                 "e",
//                 "ArrowUp",
//                 "ArrowDown",
//                 "!",
//                 "@",
//                 "#",
//                 "$",
//                 "%",
//                 "^",
//                 "&",
//                 "*",
//                 "(",
//                 ")",
//                 "_",
//                 "=",
//               ];

//               if (keys.includes(e.key)) {
//                 e.preventDefault();
//               }
//             }}
//           />
//           {inputLabel && (
//             <FloatingLabel
//               label={inputLabel}
//               InputName={String(inputName)}
//               isFloating={isFloating}
//               hasError={!!errors?.[inputName]?.message}
//               isDisabled={disabled}
//               mandatory={mandatory}
//             />
//           )}
//         </div>
//         <InputError errors={errors} inputName={inputName} />
//       </div>
//     </>
//   );
// };

// export default FormSAInputNumber;
