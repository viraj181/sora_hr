import Image from "next/image";
import React from "react";
import mainLoader from "@/image/mainLoader.gif";

function TableLoader() {
  return (
    <>
      <div className="flex items-center justify-center w-full max-h-75">
        <Image
          src={mainLoader}
          alt=""
          width={100}
          height={100}
          className="w-25 h-25"
        />
      </div>
    </>
  );
}

export default TableLoader;
