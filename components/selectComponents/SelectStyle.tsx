import {
  components,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  GroupBase,
  ControlProps,
  SingleValueProps,
} from "react-select";
import { FaCaretDown } from "react-icons/fa6";

export type Option = {
  label: string;
  value: string;
  [key: string]: string | number | boolean;
};

export const customStyle = (isError?: boolean) => {
  return {
    control: <IsMulti extends boolean = false>(
      styles: CSSObjectWithLabel,
      {
        isDisabled,
        isFocused,
      }: ControlProps<Option, IsMulti, GroupBase<Option>>,
    ) => ({
      ...styles,
      borderColor: isError ? "#fb2c36 !important" : "#D9D9D7 !important",
      boxShadow: "none !important",
      minHeight: "40px !important",
      height: "40px !important",
      alignItems: "start !important",
      display: "flex !important",
      outline: "none !important",
      borderRadius: "8px !important",
      backgroundColor: isDisabled ? "#f2f3f3" : "#ffffff",
      cursor: isDisabled ? "not-allowed" : "default",

      // "&:hover": {
      //   borderColor: isError ? "#fb2c36 !important" : "#D9D9D7 !important",
      // },
      // "&:focus": {
      //   borderColor: "#03a4aa !important",
      // },

      ...(isFocused && {
        backgroundColor: "color-mix(in oklab, #A3B055 5%, transparent)",
        borderColor: "#A3B055  !important",
      }),
    }),
    singleValue: (
      styles: CSSObjectWithLabel,
      state: SingleValueProps<Option, boolean, GroupBase<Option>>,
    ) => ({
      ...styles,
      cursor: state?.isDisabled ? "not-allowed" : "default",
      color: state?.isDisabled ? "#161f28" : "#161f28",
    }),
    option: (styles: CSSObjectWithLabel) => ({
      ...styles,
      padding: "1px 5px !important",
      zIndex: "10 !important",
      wordBreak: "break-word" as const,
      overflowWrap: "break-word" as const,
      whiteSpace: "normal" as const,
      wordWrap: "break-word" as const,
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: "#A3B055",
      "&:hover": {
        color: "#A3B055 !important",
      },
      padding: "0px 5px 0px 0px !important",
    }),
    clearIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: "#72879d",
      cursor: "pointer",
      "&:hover": {
        color: "#72879d !important",
      },
      padding: "0px 0px 0px 5px !important",
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: "#000 !important",
      outline: "none !important",
      fontSize: "14px !important",
      zIndex: "10 !important",
      maxHeight: "170px",
    }),
    menuList: (provided: CSSObjectWithLabel) => ({
      ...provided,
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      maxHeight: "170px",
    }),
    indicatorSeparator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: "0px",
      backgroundColor: "#A3B055",
    }),
    indicatorsContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
    }),
    valueContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      padding: "5px 8px !important",
      outline: "none !important",
    }),
    placeholder: (styles: CSSObjectWithLabel) => ({
      ...styles,
      color: "#72879d",
      fontWeight: "400",
      fontSize: "14px !important",
      paddingBottom: "0px !important",
      margin: "0px !important",
    }),
    input: (provided: CSSObjectWithLabel) => ({
      ...provided,
      paddingBottom: "0px !important",
      margin: "0px !important",
    }),
    menuPortal: (base: CSSObjectWithLabel) => ({
      ...base,
      zIndex: "20 !important",
    }),
  };
};

export const DropdownIndicator = (
  props: DropdownIndicatorProps<Option, boolean, GroupBase<Option>>,
) => (
  <components.DropdownIndicator {...props}>
    <FaCaretDown className="size-[18px]" />
  </components.DropdownIndicator>
);

// import {
//   components,
//   CSSObjectWithLabel,
//   DropdownIndicatorProps,
//   GroupBase,
// } from "react-select";
// import { FaCaretDown } from "react-icons/fa6";

// export type Option = {
//   label: string;
//   value: string;
// };

// export const customStyle = {
//   control: (
//     styles: CSSObjectWithLabel,
//     {
//       isDisabled,
//       isFocused,
//       isError,
//     }: { isDisabled: boolean; isFocused: boolean; isError: boolean }
//   ) => ({
//     ...styles,
//     borderColor: "#d2e3f4 !important",
//     boxShadow: "none !important",
//     minHeight: "39px !important",
//     height: "39px !important",
//     alignItems: "start !important",
//     display: "flex !important",
//     outline: "none !important",
//     borderRadius: "5px !important",
//     backgroundColor: isDisabled ? "#f2f3f3" : "white", // Custom background color when disabled
//     cursor: isDisabled ? "not-allowed" : "default", // Custom cursor when disabled

//     "&:hover": {
//       borderColor: "#d2e3f4 !important",
//     },

//     // ...(isDisabled && {
//     //   backgroundColor: "#CFDFE0 !important",
//     //   fontWeight: "300",
//     // }),

//     ...(isFocused && {
//       backgroundColor: "#ffffff !important",
//     }),
//     ...(isError && {
//       borderColor: "#df4 !important",
//     }),
//   }),
//   option: (styles: CSSObjectWithLabel) => ({
//     ...styles,
//     padding: "1px 5px !important",
//     zIndex: "10 !important",
//     // textTransform: "capitalize !important",
//   }),
//   dropdownIndicator: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     color: "#03a4aa",
//   }),
//   menu: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     color: " #000 !important",
//     outline: "none !important",
//     fontSize: "14px !important",
//     zIndex: "10 !important",
//     maxHeight: "170px",
//   }),
//   menuList: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     boxShadow:
//       "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
//     maxHeight: "170px",
//   }),
//   indicatorSeparator: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     width: "0px",
//     backgroundColor: "#03a4aa",
//   }),
//   indicatorsContainer: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//   }),
//   ValueContainer: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     padding: "5px 8px !important",
//     outline: "none !important",
//   }),
//   placeholder: (styles: CSSObjectWithLabel) => ({
//     ...styles,
//     color: "#a1a1a1",
//     fontWeight: "400",
//     fontSize: "14px !important",
//   }),
//   input: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     paddingBottom: "0px !important",
//     paddingTop: "6px !important",
//     margin: "0px !important",
//   }),
//   menuPortal: (base: CSSObjectWithLabel) => ({
//     ...base,
//     zIndex: "20 !important",
//   }),
// };

// export const DropdownIndicator = (
//   props: DropdownIndicatorProps<Option, boolean, GroupBase<Option>>
// ) => {
//   return (
//     <components.DropdownIndicator {...props}>
//       <FaCaretDown className="size-[18px]" />
//       {/* <MdOutlineArrowDropDownCircle  /> */}
//     </components.DropdownIndicator>
//   );
// };
