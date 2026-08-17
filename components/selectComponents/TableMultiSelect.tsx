import React from "react";
import Select, {
  components,
  MultiValue,
  GroupBase,
  MenuListProps,
} from "react-select";
import { customStyle, DropdownIndicator, Option } from "./SelectStyle";

interface TableMultiSelectProps {
  options: Option[];
  name: string;
  value: Option[];
  onChange: (selectedOptions: Option[]) => void;
  setSelectSearchValue: (value: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  menuAddChildren?: React.ReactNode;
  isError?: boolean;
  menuPlacement?: "auto" | "top" | "bottom";
}

function TableMultiSelect({
  options,
  name,
  value,
  onChange,
  setSelectSearchValue,
  isDisabled,
  placeholder,
  menuAddChildren,
  isError = false,
  menuPlacement,
}: TableMultiSelectProps) {
  const MenuList = (
    props: MenuListProps<Option, boolean, GroupBase<Option>>,
  ) => {
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
    <Select<Option, true, GroupBase<Option>>
      components={{
        DropdownIndicator: isDisabled ? () => null : DropdownIndicator,
        MenuList,
      }}
      isDisabled={isDisabled}
      value={value}
      onChange={(newValue: MultiValue<Option>) => {
        onChange([...newValue]);
      }}
      classNamePrefix="custom-multi-select"
      name={name}
      options={options}
      placeholder={placeholder || "Select"}
      onInputChange={setSelectSearchValue}
      menuPlacement={menuPlacement}
      menuPortalTarget={document.body}
      menuPosition="fixed"
      styles={{
        ...customStyle(isError),
        multiValue: (provided) => ({
          ...provided,
          display: "inline-flex", // Display selected options inline
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#03a4aa",
          borderRadius: "5px",
          margin: "2px", // Add margin between selected options
          minWidth: "100px",
          maxWidth: "100px",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#fff",
          fontSize: "14px",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "#fff",
          ":hover": {
            backgroundColor: "transparent",
            color: "#fff",
          },
        }),
        valueContainer: (provided) => ({
          ...provided,
          flexWrap: "nowrap",
          overflowX: "auto",
          display: "inline-flex",
          alignItems: "center", // Add this line
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#72879d",
          fontWeight: "400",
          fontSize: "14px !important",
          padding: "5px 0px !important",
        }),
      }}
      isMulti
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: "#03a4aa",
          primary25: "#e6e6e6",
          primary50: "#e6e6e6",
        },
      })}
    />
  );
}

export default TableMultiSelect;
