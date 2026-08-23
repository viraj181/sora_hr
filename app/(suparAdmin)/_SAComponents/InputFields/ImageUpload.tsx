import Image from "next/image";
import React, { useRef } from "react";
import { FaCloudArrowUp } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const ImageUpload = ({
  image,
  setImage,
}: {
  image: string | File | null;
  setImage: (image: string | File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length > 0) {
      setImage(e.dataTransfer.files?.[0] || null);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className=" flex flex-col items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          id="fileInput"
          className="hidden"
          onChange={(e) => {
            setImage(e.target.files?.[0] || null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
          accept={"image/*,"}
        />

        {image ? (
          <>
            <div className="relative flex flex-col items-center justify-center gap-2">
              <div className=" p-2 flex items-center justify-center">
                <Image
                  src={
                    image
                      ? typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                      : ""
                  }
                  alt="Uploaded Image"
                  width={200}
                  height={200}
                  className="w-40 h-37.5 object-contain border-4 border-borderLine"
                />
              </div>
              <a
                type="button"
                className="button rounded-none! absolute top-2 right-2 p-1!"
                onClick={() => {
                  setImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <ImCross />
              </a>
            </div>
          </>
        ) : (
          <>
            <label
              htmlFor="fileInput"
              className="w-full p-4 bg-tableHover border border-borderLine cursor-pointer rounded-lg"
            >
              <div className="flex flex-col w-40 h-37.5 items-center justify-center gap-1">
                <FaCloudArrowUp className="text-avocado" size={40} />
                <p className="text-font14 capitalize font-semibold">
                  Drag and drop a image here or click
                </p>
                <p className="button py-1!">Upload</p>
              </div>
            </label>
          </>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
