import nodata from "@/image/noData.png";
import Image from "next/image";
function NoData() {
  return (
    <div className="flex items-center justify-center w-full max-h-10">
      <Image
        src={nodata}
        alt=""
        width={0}
        height={0}
        className="max-w-70 w-full"
      />
    </div>
  );
}

export default NoData;
