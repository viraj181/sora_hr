import React from "react";
import FloatingLabel from "./FloatingLabel";

const StaticInputValue = ({
  staticInputLabel,
  staticValue,
}: {
  staticInputLabel: string;
  staticValue: string;
}) => {
  return (
    <>
      <div className="w-full mb-2">
        <div className="relative">
          <input
            disabled={true}
            type="text"
            value={staticValue || "-"}
            className={`formInputClass`}
          />
          <FloatingLabel
            label={staticInputLabel}
            InputName={staticInputLabel}
            isFloating={true}
            hasError={false}
            isDisabled={false}
            mandatory={false}
          />
        </div>
      </div>
    </>
  );
};

export default StaticInputValue;
