"use client";

import cn from "@yeahx4/cn";
import { useEffect, useState } from "react";

export default function PostImage({
  src,
  option,
  alt,
}: {
  src: string;
  alt: string;
  option?: string;
}) {
  const [popup, setPopup] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setPopup(false);
    }
  };

  useEffect(() => {
    if (popup) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popup]);

  let width = "max-w-md";
  if (option === "full") {
    width = "max-w-full";
  } else if (option === "2xl") {
    width = "max-w-2xl";
  } else if (option === "lg") {
    width = "max-w-lg";
  } else if (option === "md") {
    width = "max-w-md";
  } else if (option === "sm") {
    width = "max-w-sm";
  }

  return (
    <>
      <div
        className="flex justify-center py-8 hover:cursor-pointer"
        onClick={() => setPopup(true)}
      >
        <img src={src} alt={alt} className={cn("w-full", width)} />
      </div>

      {popup && (
        <div
          className={cn(
            "fixed inset-0 bg-black bg-opacity-75 flex justify-center",
            "items-center z-50 transition-opacity duration-300"
          )}
          onClick={() => setPopup(false)}
        >
          <div className="relative">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
