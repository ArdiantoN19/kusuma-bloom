"use client";

import { X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { FunctionComponent } from "react";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: FunctionComponent<ModalProps> = ({ children }) => {
  // const dialogRef = useRef<ElementRef<"dialog">>(null);
  const router = useRouter();

  const onDismissModal = () => {
    router.back();
  };

  return (
    <>
      <div
        className="fixed z-50 top-0 left-0 w-full h-screen backdrop-blur bg-black/80"
        onClick={onDismissModal}
      ></div>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <button
            className="text-muted-foreground absolute top-4 right-4"
            onClick={onDismissModal}
          >
            <X size={14} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
