import React from "react";
import { MdHelpCenter } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="bg-white border-t border-borderLine h-14 flex items-center justify-between px-4 sm:px-6 text-darkOlive">
        <div className="font-semibold text-font14">
          &copy; {new Date().getFullYear()} NeoManthan Systems Private Limited
          All Rights Reserved.
        </div>
        <div className="h-full flex items-center pl-4 border-l border-borderLine text-font14 font-semibold cursor-pointer shrink-0">
          <div className="flex items-center gap-2 px-2">
            <MdHelpCenter className="h-6 w-6 text-avocado" />
            <span>Help</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
