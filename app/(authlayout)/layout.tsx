import React from "react";
import PhotoSection from "../../public/file.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh overflow-hidden w-screen bg-[url('/loginBackGround.jpeg')] bg-cover bg-center bg-no-repeat  ">
      <div className=" h-full flex items-center justify-center">
        {/* left side */}
        {/* <LeftSideAuth /> */}
        {/* right side */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
