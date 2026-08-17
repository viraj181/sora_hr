"use client";
import { useEffect } from "react";

const useTabKey = ({ isSubmitting }: { isSubmitting: boolean }) => {
  useEffect(() => {
    // If not submitting, we don't need to do anything.
    // This keeps the event loop clean.
    if (!isSubmitting) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Block Tab and Enter keys
      if (event.key === "Tab" || event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    // Add listener with useCapture = true (the 3rd argument)
    // This is crucial to intercept the event before input fields receive it.
    document.addEventListener("keydown", handleKeyDown, true);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isSubmitting]); // Re-run effect only when isSubmitting changes
};

export default useTabKey;
