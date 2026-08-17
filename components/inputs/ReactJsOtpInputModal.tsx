import OtpInput from "react-otp-input";
const ReactJsOtpInputModal = ({
  otp,
  handleChange,
  maxlength = 6,
  type = "password",
  autoFocus = true,
  disabled = false,
}: {
  otp: string;
  handleChange: (otp: string) => void;
  maxlength?: number;
  type?: "password" | "number";
  autoFocus?: boolean;
  disabled?: boolean;
}) => {
  return (
    <>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={maxlength}
        shouldAutoFocus={autoFocus}
        inputType={type}
        renderInput={(props) => (
          <input
            {...props}
            pattern="[0-9]*"
            inputMode="numeric"
            disabled={disabled}
            onKeyDown={(e) => {
              const allowedKeys = ["Backspace", "Enter"];

              if (e.ctrlKey || e.metaKey) {
                return;
              }

              if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        )}
        inputStyle="rounded-full text-font24 text-darkGrayish border bg-lightGreen border-borderLine focus:outline-olive flex justify-center items-center min-w-[50px] h-[50px] focus:outline-none focus:border-olive focus:border-2"
        containerStyle="gap-2"
      />
    </>
  );
};

export default ReactJsOtpInputModal;
