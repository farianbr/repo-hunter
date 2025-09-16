"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

// Base props of our component
interface BaseProps {
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  children: React.ReactNode;
}

// Polymorphic prop helper: allows `as` to control which props are valid
type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
} & BaseProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BaseProps | "as">;

export function HoverBorderGradient<T extends React.ElementType = "button">({
  children,
  containerClassName,
  className,
  as,
  duration = 1,
  clockwise = true,
  ...props
}: PolymorphicProps<T>) {
const Tag = (as || "button") as React.ElementType<{ children?: React.ReactNode }>;
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (current: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(current);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(60% 100% at 50% 0%, rgba(50,117,248,1) 0%, rgba(50,117,248,0.6) 50%, rgba(50,117,248,0) 95%)",
    LEFT: "radial-gradient(100% 60% at 0% 50%, rgba(50,117,248,1) 0%, rgba(50,117,248,0.6) 50%, rgba(50,117,248,0) 95%)",
    BOTTOM:
      "radial-gradient(60% 100% at 50% 100%, rgba(50,117,248,1) 0%, rgba(50,117,248,0.6) 50%, rgba(50,117,248,0) 95%)",
    RIGHT:
      "radial-gradient(100% 60% at 100% 50%, rgba(50,117,248,1) 0%, rgba(50,117,248,0.6) 50%, rgba(50,117,248,0) 95%)",
  };

  const highlight =
    "radial-gradient(100% 200% at 50% 50%, rgba(50,117,248,1) 0%, rgba(50,117,248,0.8) 40%, rgba(50,117,248,0.4) 70%, rgba(50,117,248,0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex w-fit rounded-full border bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col gap-10 overflow-visible p-px",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>

      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: "blur(2px)" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />

      <div className="absolute inset-[2px] z-0 flex-none rounded-[100px] bg-black" />
    </Tag>
  );
}
