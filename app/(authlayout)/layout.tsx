import React from "react";
import LeftSideAuth from "./_loginComponents/LeftSideAuth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh overflow-hidden w-screen bg-lightGreen">
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
