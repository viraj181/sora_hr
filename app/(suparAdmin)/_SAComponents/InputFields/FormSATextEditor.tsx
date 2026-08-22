"use client";
import React, { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import dynamic from "next/dynamic";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import InputError from "@/components/InputError";
import FloatingLabel from "@/components/FloatingLabel";
import { twMerge } from "tailwind-merge";

function FormSATextEditor<T extends FieldValues>({
  style,
  errors,
  editorLabel,
  editorName,
  control,
  mandatory = false,
}: {
  style?: string;
  errors: FieldErrors<T>;
  editorLabel: string;
  editorName: Path<T>;
  control: Control<T>;
  mandatory?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  // ✅ Add Quill modules and formats for color support
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic"],
      // [{ color: [] }, { background: [] }], // 🎨 text and background color
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      // ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    // "underline",
    // "color",
    // "background",
    "list",
    "link",
    "image",
  ];

  return (
    <div className="w-full mb-3">
      <div className="relative">
        <Controller
          name={editorName}
          control={control}
          render={({ field }) => {
            return (
              <>
                <div
                  className={twMerge(
                    "absolute top-16 w-full transition-all duration-200 ease-in-out",
                    (field.value !== "<p></p>" || isFocused) && "top-0",
                  )}
                >
                  <FloatingLabel
                    label={editorLabel}
                    InputName={String(editorName)}
                    isFloating={field.value !== "<p></p>" || isFocused}
                    hasError={!!errors?.[editorName]?.message}
                    mandatory={mandatory}
                  />
                </div>
                <ReactQuill
                  {...field}
                  theme="snow"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  className={style}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  // placeholder="Enter your title here"
                  modules={modules} // ✅ include toolbar config
                  formats={formats} // ✅ include allowed formats
                />
              </>
            );
          }}
        />
      </div>
      <InputError errors={errors} inputName={editorName} />
    </div>
  );
}

export default FormSATextEditor;
