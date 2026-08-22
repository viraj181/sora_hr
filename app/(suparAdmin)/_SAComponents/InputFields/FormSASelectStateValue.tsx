import FloatingLabel from "@/components/FloatingLabel";
import InputError from "@/components/InputError";
import { Option } from "@/components/selectComponents/SelectStyle";
import TableSelect from "@/components/selectComponents/TableSelect";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

const FormSASelectStateValue = <T extends FieldValues>({
  options,
  name,
  placeholder,
  setSelectSearchValue = () => {},
  selectLabel,
  errors,
  control,
  mandatory = false,
  isDisabled = false,
  selectedValue,
  onChange,
  menuAddChildren,
  menuPlacement,
  isMenuPortalTarget = false,
  manualError,
}: {
  options: Option[];
  name: Path<T>;
  placeholder?: string;
  setSelectSearchValue?: (value: string) => void;
  selectLabel: string;
  errors: FieldErrors<T>;
  control: Control<T>;
  mandatory?: boolean;
  isDisabled?: boolean;
  selectedValue?: Option | null;
  onChange?: (selected: Option) => void;
  menuAddChildren?: React.ReactNode;
  menuPlacement?: "auto" | "top" | "bottom";
  isMenuPortalTarget?: boolean;
  manualError?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full mb-3">
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const selectedOption = options?.find(
              (option: { value: string | number; label: string }) =>
                String(option.value) === String(field.value),
            );
            const isFloating =
              isFocused || !!selectedOption?.value || !!selectedValue?.value;

            return (
              <>
                {selectLabel && (
                  <FloatingLabel
                    label={selectLabel}
                    InputName={String(name)}
                    isFloating={isFloating}
                    hasError={!!errors?.[name]?.message}
                    isDisabled={isDisabled}
                    mandatory={mandatory}
                  />
                )}
                <TableSelect
                  {...field}
                  options={options}
                  isDisabled={isDisabled}
                  value={selectedValue ? selectedValue : selectedOption || null}
                  setSelectSearchValue={(value: string) =>
                    setSelectSearchValue?.(value)
                  }
                  onChange={(selected: Option) => {
                    field.onChange(selected?.value ? selected?.value : null);
                    onChange?.(selected);
                  }}
                  menuPlacement={menuPlacement}
                  menuAddChildren={menuAddChildren}
                  isError={errors[name] || manualError ? true : false}
                  placeholder={placeholder || ""}
                  isClearable={!mandatory}
                  isMenuPortalTarget={isMenuPortalTarget}
                  setIsFocused={setIsFocused}
                />
              </>
            );
          }}
        />
      </div>
      <InputError errors={errors} inputName={name} manualError={manualError} />
    </div>
  );
};

export default FormSASelectStateValue;
