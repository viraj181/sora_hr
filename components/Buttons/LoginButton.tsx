"use client";
import ButtonLoader from "./ButtonLoader";

export function LoginButton({
  btnName,
  isSubmitting,
  loaderClass,
}: {
  btnName?: string;
  loaderClass?: string;
  isSubmitting: boolean;
}) {
  return (
    <>
      <button type="submit" className="button w-full!" disabled={isSubmitting}>
        {isSubmitting ? (
          <ButtonLoader className={loaderClass} />
        ) : (
          <>{btnName || "Submit"}</>
        )}
      </button>
    </>
  );
}
{
  /* <div className="flex justify-center items-center w-full">
            <Image
              src={btnloader}
              alt="btnloader"
              width={0}
              height={0}
              className="w-[20px] h-[21px]"
            />
          </div>*/
}
