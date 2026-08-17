import Image from "next/image";
import React from "react";
import ModalWrapper from "./model/ModalWrapper";

const ImageModal = ({
  imageUrl,
  onClose,
  modal,
}: {
  imageUrl: string;
  onClose: () => void;
  modal: boolean;
}) => {
  return (
    <>
      <ModalWrapper
        model={modal}
        modelTitle="image overview"
        handleClose={onClose}
        className="max-h-[90vh]"
      >
        <div className="p-5 relative max-h-[calc(90vh-80px)] overflow-auto horizontalScroll">
          <Image
            src={imageUrl}
            alt=""
            width={500}
            height={500}
            unoptimized
            className="w-full h-auto"
          />
        </div>
      </ModalWrapper>
    </>
  );
};

export default ImageModal;
