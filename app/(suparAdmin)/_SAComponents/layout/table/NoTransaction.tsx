import noTransaction from "@/image/noTransaction.png";
import Image from "next/image";
function NoTransaction() {
  return (
    <div className="flex items-center justify-center w-full max-h-75">
      <Image
        src={noTransaction}
        alt=""
        width={0}
        height={0}
        className="max-w-100 w-full"
      />
    </div>
  );
}

export default NoTransaction;
