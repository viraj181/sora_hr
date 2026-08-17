import Image from "next/image";
import React from "react";
import btnLoader from "@/image/btnLoader.gif";
import { twMerge } from "tailwind-merge";
const ButtonLoader = ({ className }: { className?: string }) => {
  return (
    <div className="flex justify-center items-center w-full h-6">
      <Image
        src={btnLoader}
        alt="btnLoader"
        width={0}
        height={0}
        className={twMerge("h-10 object-contain object-center", className)}
      />
    </div>
  );
};

export default ButtonLoader;
