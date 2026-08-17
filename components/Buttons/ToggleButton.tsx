function ToggleButton({
  isActive,
  toggleClick,
  isDisabled = false,
  isSubmitting = false,
}: {
  isActive: boolean;
  toggleClick: () => void;
  isDisabled?: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <label
      className={`inline-flex items-center ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${isSubmitting ? "cursor-progress" : ""}`}
    >
      <div className="relative border border-avocado rounded-full">
        <input
          type="checkbox"
          value=""
          className="sr-only"
          onClick={isDisabled ? undefined : toggleClick}
        />
        {/* <div className="relative w-7 h-4 bg-[--border] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:w-3 after:h-3 after:transition-all  peer-checked:bg-[--darkBlue]"></div> */}
        <div
          className={`h-3.5 w-6 rounded-full  shadow-inner  ${
            isActive ? "bg-avocado" : "bg-olive"
          }`}
        ></div>
        <div
          className={` shadow-switch-1 absolute  top-0.5 h-2.5 w-2.5  rounded-full  transition ${
            isActive ? "left-2.75 bg-white" : "left-0.75 bg-white"
          }`}
        ></div>
      </div>
    </label>
  );
}

export default ToggleButton;
