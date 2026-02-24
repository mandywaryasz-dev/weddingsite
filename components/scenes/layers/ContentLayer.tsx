import { ReactNode } from "react";

type ContentLayerProps = {
  children: ReactNode;
};

export function ContentLayer({ children }: ContentLayerProps) {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-16 sm:px-10">
      <div className="w-full space-y-6">{children}</div>
    </div>
  );
}
