import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

export type RevealDirection = "up" | "left" | "right" | "zoom";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

const hiddenClasses: Record<RevealDirection, string> = {
  up: "opacity-0 translate-y-10",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  zoom: "opacity-0 scale-95",
};

export const Reveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
  as = "div",
}: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={cn(
        "will-change-transform transition-all duration-700 ease-out",
        hiddenClasses[direction],
        inView && "translate-x-0 translate-y-0 scale-100 opacity-100",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};