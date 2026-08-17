"use client";

import { useAppSelector } from "@/store/hook";

export const useImageUrl = () => {
  const baseImageUrl = useAppSelector((state) => state.auth.baseImageUrl);

  return (path?: string | null) => {
    if (!path) return "/images/no-image.png";
    if (path.startsWith("http")) return path;

    return `${baseImageUrl}${path}`;
  };
};
