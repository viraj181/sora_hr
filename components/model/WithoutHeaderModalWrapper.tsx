"use client";
import { useEffect, useRef } from "react";
import React from "react";
function WithoutHeaderModalWrapper({
  model,
  children,
  className,
}: {
  model: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const mainDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (model && mainDivRef.current) {
      mainDivRef.current.focus();
    }
  }, [model]);
  return (
    <>
      {model && (
        <div className="overflow-hidden fixed top-0 right-0 left-0 z-5 p-4 justify-center items-center w-full md:inset-0 h-dvh flex  bg-black/50 transition-opacity duration-700 ">
          <div
            className={`relative w-full max-w-145 overflow-hidden max-h-full flex flex-col rounded-lg ${className}`}
          >
            <div className="relative bg-white rounded-md shadow">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WithoutHeaderModalWrapper;
