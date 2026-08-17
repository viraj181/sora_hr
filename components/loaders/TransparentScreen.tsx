import React from "react";

const TransparentScreen = () => {
  return (
    <>
      <div className="overflow-hidden fixed top-0 right-0 left-0 z-55 justify-center items-center w-full md:inset-0 h-[calc(100%-0rem)] max-h-full flex bg-transparent transition-opacity duration-700 " />
    </>
  );
};

export default TransparentScreen;
