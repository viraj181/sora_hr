import { ReactNode, isValidElement } from "react";

export const EmptyDataCheck = (value: ReactNode): ReactNode => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (isValidElement(value) &&
      !(value?.props as unknown as { children: ReactNode })?.children)
  ) {
    return <span className="tracking-[-0.2em]">--</span>;
  }

  return value;
};

export const ToUpperCase = (value?: string) => {
  return value ? value.toUpperCase() : "";
};

export const ToFixedTwo = (value?: string | number) => {
  return value ? Number(value).toFixed(2) : "0";
};

// import {  ReactNode } from "react";

// export const EmptyDataCheck = (
//   value:
//     | string
//     | number
//     | boolean
//     | null
//     | undefined
//     | unknown
//     | Object
//     | ReactNode,
// ): ReactNode => {
//   return value !== null &&
//     value !== undefined &&
//     value !== "" &&
//     value?.props?.children ? (
//     <>{value}</>
//   ) : (
//     <span className="-tracking-[0.2em]">--</span>
//   );
// };
