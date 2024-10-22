"use client";

import { useEffect, useState } from "react";

export default function PostImage({ src, alt }: { src: string; alt: string }) {
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

  return (
    <>
      <div
        className="flex justify-center py-8 hover:cursor-pointer"
        onClick={() => setPopup(true)}
      >
        <img src={src} alt={alt} className="max-w-md w-full" />{" "}
      </div>

      {popup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300"
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
