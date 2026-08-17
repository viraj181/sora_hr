import React, { SetStateAction } from "react";
import Select, {
  components,
  GroupBase,
  MenuListProps,
  SingleValue,
} from "react-select";
import { customStyle, DropdownIndicator, Option } from "./SelectStyle";

interface TableSelectProps {
  options: Option[];
  name: string;
  value: Option | null;
  onChange: (selectedOption: Option) => void;
  setSelectSearchValue: (value: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  isError?: boolean;
  menuAddChildren?: React.ReactNode;
  isClearable?: boolean;
  menuPlacement?: "auto" | "top" | "bottom";
  isMenuPortalTarget?: boolean;
  setIsFocused: React.Dispatch<SetStateAction<boolean>>;
}

function TableSelect({
  options,
  name,
  value,
  onChange,
  setSelectSearchValue,
  isDisabled,
  placeholder,
  isError = false,
  menuAddChildren,
  isClearable = true,
  menuPlacement,
  isMenuPortalTarget = false,
  setIsFocused,
}: TableSelectProps) {
  const MenuList = (props: MenuListProps<Option, false, GroupBase<Option>>) => {
    return (
      <components.MenuList {...props}>
        <div className="sticky -top-1 inset-x-0 bottom-0 z-10">
          {menuAddChildren}
        </div>
        {props.children}
      </components.MenuList>
    );
  };

  return (
    <Select<Option, false, GroupBase<Option>>
      components={{
        DropdownIndicator: isDisabled ? () => null : DropdownIndicator,
        MenuList,
      }}
      isDisabled={isDisabled}
      value={value}
      onChange={(newValue: SingleValue<Option>) => {
        onChange(newValue as Option);
      }}
      name={name}
      options={options}
      menuPlacement={menuPlacement}
      placeholder={placeholder || ""}
      onInputChange={setSelectSearchValue}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      menuPortalTarget={isMenuPortalTarget ? document.body : undefined}
      menuPosition={isMenuPortalTarget ? "fixed" : undefined}
      styles={customStyle(isError)}
      isClearable={isClearable}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: "#A3B055",
          primary25: "#e6e6e6",
          primary50: "#e6e6e6",
        },
      })}
    />
  );
}

export default TableSelect;
