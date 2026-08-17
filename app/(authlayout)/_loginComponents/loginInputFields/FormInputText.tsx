import FloatingLabel from "@/components/FloatingLabel";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import InputLoginError from "./InputLoginError";
import { useState } from "react";

const FormInputText = <T extends FieldValues>({
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
  mandatory: boolean;
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
            setIsFocused(!!e.target.value);
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

      <InputLoginError errors={errors} inputName={inputName} />
    </div>
  );
};

export default FormInputText;
// import FloatingLabel from "@/components/FloatingLabel";
// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
// } from "react-hook-form";
// import InputLoginError from "./InputLoginError";
// import { useState } from "react";
// // import InputLoginError from "./InputLoginError";
// // import InputLoginLabel from "./InputLoginLabel";

// const FormInputText = <T extends FieldValues>({
//   inputLabel,
//   inputName,
//   inputPlaceholder,
//   register,
//   errors,
//   disabled = false,
//   mandatory = false,
// }: {
//   inputLabel?: string;
//   inputName: Path<T>;
//   inputPlaceholder?: string;
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   disabled?: boolean;
//   mandatory: boolean;
// }) => {
//   const [isFloating, setIsFocused] = useState(false);
//   return (
//     <>
//       <div className="w-full mb-2 relative">
//         {/* <InputLoginLabel inputLoginLabel={inputLabel} mandatory={mandatory} /> */}

//         <input
//           disabled={disabled}
//           type="text"
//           placeholder={`${inputPlaceholder || ""}`}
//           {...register(inputName)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => {
//             setIsFocused(false);
//           }}
//           className={`formInputClass placeholder:capitalize disabled:bg-tableHover disabled:cursor-not-allowed bg-white ${errors[inputName] ? "border! border-red-500!" : ""} `}
//         />

//         {inputLabel && (
//           <FloatingLabel
//             label={inputLabel}
//             InputName={String(inputName)}
//             isFloating={isFloating}
//             hasError={!!errors[inputName]}
//             isDisabled={disabled}
//             mandatory={mandatory}
//           />
//         )}

//         <InputLoginError errors={errors} inputName={inputName} />
//       </div>
//     </>
//   );
// };

// export default FormInputText;
