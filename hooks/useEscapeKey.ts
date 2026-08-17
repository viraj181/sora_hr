"use client";
import { useEffect } from "react";

const useEscapeKey = ({
  isOpen,
  onClose,
  isDisabled = false, // 👈 Add this to disable the escape key
}: {
  isOpen: boolean;
  onClose: () => void;
  isDisabled?: boolean;
}) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      // Only close if modal is open AND not disabled
      if (event.key === "Escape" && isOpen && !isDisabled) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, isDisabled]); // 👈 Include all dependencies
};

export default useEscapeKey;
