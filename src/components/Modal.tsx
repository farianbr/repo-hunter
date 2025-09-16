import React from "react";
import { WobbleCard } from "./ui/wobble-card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
      className="z-10"
    >
      <div
        style={{
          borderRadius: "10px",
          color: "white",
        }}
        className="max-w-[300px] md:min-w-[500px] bg-none"
        onClick={(e) => e.stopPropagation()}
      >
        <WobbleCard className="text-center" containerClassName="bg-slate-900">
          {children}
          <button
            className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] mt-6 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={onClose}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Close
            </span>
          </button>
        </WobbleCard>
      </div>
    </div>
  );
};

export default Modal;
