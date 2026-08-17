import { RiDeleteBinFill, RiEdit2Fill } from "react-icons/ri";

const ActionEditDeleteButton = ({
  deleteClick,
  updateClick,
  showEdit,
  showDelete,
}: {
  deleteClick?: () => void;
  updateClick?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
}) => {
  return (
    <>
      <div
        className={`flex items-center gap-1 ${
          showEdit || showDelete ? "justify-center" : ""
        }`}
      >
        {showEdit && (
          <RiEdit2Fill
            className={`text-font18 ${
              updateClick
                ? "cursor-pointer text-avocado"
                : "cursor-not-allowed text-mandalay"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              updateClick?.();
            }}
          />
        )}
        {showDelete && (
          <RiDeleteBinFill
            className={`text-font18  ${
              deleteClick
                ? "cursor-pointer text-darkred"
                : "cursor-not-allowed text-mandalay"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              deleteClick?.();
            }}
          />
        )}
      </div>
    </>
  );
};

export default ActionEditDeleteButton;
