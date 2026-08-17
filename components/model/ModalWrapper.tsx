"use client";
import { useEffect, useRef } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import React from "react";
import { FocusTrap } from "focus-trap-react";

function ModalWrapper({
  model,
  modelTitle,
  modalHeaderChildren,
  children,
  handleClose,
  handleAddItem,
  className,
}: {
  model: boolean;
  modelTitle: string;
  modalHeaderChildren?: React.ReactNode;
  children: React.ReactNode;
  handleClose?: () => void;
  handleAddItem?: () => void;
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
        <FocusTrap
          active={model}
          focusTrapOptions={{
            allowOutsideClick: true,
            escapeDeactivates: true,
            clickOutsideDeactivates: true,
          }}
        >
          <div className="overflow-hidden fixed top-0 right-0 left-0 z-5 p-4 justify-center items-center w-full md:inset-0 h-dvh flex  bg-black/50 transition-opacity duration-700 ">
            <div
              className={`relative w-full max-w-145 overflow-hidden max-h-full flex flex-col rounded-lg ${className}`}
            >
              <div className="flex items-center justify-between bg-lightGreen shrink-0 p-4">
                <h3 className="text-font16 font-semibold text-darkOlive capitalize">
                  {modelTitle}
                </h3>

                {modalHeaderChildren}
                {handleClose && (
                  <button
                    type="button"
                    className=" bg-darkred cursor-pointer text-white rounded-full text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={handleClose}
                  >
                    <IoMdClose />
                  </button>
                )}
                {handleAddItem && (
                  <button
                    type="button"
                    className=" bg-cyan cursor-pointer text-white rounded-full text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={handleAddItem}
                  >
                    <IoMdAdd />
                  </button>
                )}
              </div>
              <div className="flex flex-col flex-1 overflow-auto horizontalScroll bg-white shadow p-4">
                {children}
              </div>
            </div>
          </div>
        </FocusTrap>
      )}
    </>
  );
}

export default ModalWrapper;
