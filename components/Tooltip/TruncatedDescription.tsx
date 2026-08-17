import TooltipComponent from "./TooltipComponent";

export const TruncatedDescription = (description: string, length: number) => {
  return description?.length > length
    ? `${description.slice(0, length)}...`
    : description;
};

export const TruncatedWithTooltip = (description: string, length: number) => {
  return description?.length > length ? (
    <TooltipComponent reasons={description} length={length} />
  ) : (
    description
  );
};

export const TableRediredt = (
  description: string,
  length: number,
  onClick?: () => void,
) => {
  return (
    <p
      className={`${onClick ? "cursor-pointer text-cyan font-bold text-font13" : ""}`}
      onClick={onClick}
    >
      {TruncatedWithTooltip(description, length)}
    </p>
  );
};
