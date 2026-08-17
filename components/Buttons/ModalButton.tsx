"use client";
import ButtonLoader from "./ButtonLoader";

export function ModalButton({
  closeButtonText,
  submitButtonText,
  handleClose,
  isSubmitting,
  btnClassName,
}: {
  closeButtonText?: string;
  submitButtonText?: string;
  handleClose: () => void;
  isSubmitting: boolean;
  btnClassName?: string;
}) {
  return (
    <>
      <div className={`flex gap-2 ${btnClassName}`}>
        <button
          type="button"
          className="button w-full! bg-none! bg-white! text-avocado! border! border-mandalay! py-1.5!"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          {closeButtonText ?? "Cancel"}
        </button>
        <button
          type="submit"
          className="button whitespace-nowrap w-full! py-1.5!"
          disabled={isSubmitting}
        >
          {isSubmitting ? <ButtonLoader /> : (submitButtonText ?? "Submit")}
        </button>
      </div>
    </>
  );
}
