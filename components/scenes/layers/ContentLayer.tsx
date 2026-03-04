import { ReactNode } from "react";
import clsx from "clsx";

type ContentLayerProps = {
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  innerClassName?: string;
};

const alignClassMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end"
} as const;

export function ContentLayer({ children, align = "center", className, innerClassName }: ContentLayerProps) {
  return (
    <div
      className={clsx(
        "relative z-10 mx-auto flex min-h-screen w-full max-w-[72rem] px-scene-x py-scene-y",
        alignClassMap[align],
        className
      )}
    >
      <div className={clsx("w-full flex flex-col gap-stack-lg", innerClassName)}>{children}</div>
    </div>
  );
}
