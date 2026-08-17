"use client";
import { useAppSelector } from "@/store/hook";

export const GetImageUrl = (path?: string | null) => {
  const { baseImageUrl } = useAppSelector((state) => state.auth);
  if (!path) return "/images/no-image.png";

  if (path.startsWith("http")) return path;

  return `${baseImageUrl}${path}`;
};
