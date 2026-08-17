"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RiFileUploadFill } from "react-icons/ri";
import FilePreviewBox from "./FilePreview";

export interface ImageUrlDataType {
  id: number | string;
  path: string;
}

interface UploadImageArrayProps {
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  accept?: string;
  imageUrlData?: ImageUrlDataType[];
  handelDeleteUrlData?: (id: number) => void;
}

const UploadImageArray: React.FC<UploadImageArrayProps> = ({
  uploadedFiles,
  setUploadedFiles,
  accept = ".pdf,.png,.jpg,.jpeg, .doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt",
  imageUrlData,
  handelDeleteUrlData,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const filteredFiles = filesArray.filter((file) => {
        const fileName = uploadedFiles.find((f) => f.name === file.name);
        return !fileName;
      });

      setUploadedFiles((prev) => [...prev, ...filteredFiles]);
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);

      const filteredFiles = filesArray.filter((file) => {
        const fileName = uploadedFiles.find((f) => f.name === file.name);
        return !fileName;
      });

      setUploadedFiles((prev) => [...prev, ...filteredFiles]);
      e.dataTransfer.clearData();
    }
  };

  const handleDelete = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div
        className={`w-40 h-40 text-avocado border rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer transition ${
          isDragging ? "border-olive bg-lightGreen" : "border-borderLine"
        }`}
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <RiFileUploadFill size={30} className="text-olive" />
        <p className="text-sm">Drag & drop or</p>
        <span className="text-blue-600 underline text-sm">Browse files</span>

        {/* Hidden File Input */}
        <input
          type="file"
          multiple
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Uploaded Previews */}
      {uploadedFiles.map((file, index) => (
        <div
          key={index}
          className="w-40 h-40 border border-borderLine rounded-lg bg-white"
        >
          <div className="flex items-center justify-between p-2 bg-lightGreen border-b border-borderLine rounded-t-lg">
            <p className="text-sm font-semibold">Uploaded</p>
            <button
              type="button"
              onClick={() => handleDelete(index)}
              className="w-4 h-4 flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-red bg-olive text-white"
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="w-full h-30 rounded-b-lg">
            <FilePreviewBox
              name={file?.name}
              type={file?.type}
              imageUrl={URL.createObjectURL(file)}
            />
          </div>
        </div>
      ))}

      {imageUrlData?.map((item: ImageUrlDataType, index: number) => (
        <div
          key={index}
          onClick={() => {
            window.open(item.path, "_blank");
          }}
          className="w-40 h-40 border border-border bg-white cursor-pointer"
        >
          <div className="flex items-center justify-between p-2 bg-tableHover border-b border-border">
            <p className="text-sm font-semibold mb-1">Uploaded</p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handelDeleteUrlData?.(item.id as number);
              }}
              className="w-4 h-4 flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-red bg-cyan text-white"
            >
              <IoCloseSharp />
            </button>
          </div>
          <Image
            src={item.path}
            alt="preview"
            className="w-full h-30 object-contain"
            width={100}
            height={50}
          />
        </div>
      ))}
    </div>
  );
};

export default UploadImageArray;
