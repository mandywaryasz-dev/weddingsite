import { ReactNode } from "react";
import clsx from "clsx";

type ContentLayerProps = {
  children: ReactNode;
  className?: string;
  align?: "top" | "center" | "bottom";
};

const alignMap = {
  top: "items-start pt-20 sm:pt-24",
  center: "items-center",
  bottom: "items-end pb-20 sm:pb-24"
};

export function ContentLayer({ children, className, align = "center" }: ContentLayerProps) {
  return (
    <div
      className={clsx(
        "relative z-10 mx-auto flex min-h-screen w-full max-w-4xl px-6 py-16 sm:px-10",
        alignMap[align],
        className
      )}
    >
      <div className="w-full space-y-6">{children}</div>
    </div>
  );
}
