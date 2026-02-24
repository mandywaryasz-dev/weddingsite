import { ReactNode } from "react";

type OrnamentLayerProps = {
  children?: ReactNode;
};

export function OrnamentLayer({ children }: OrnamentLayerProps) {
  if (!children) return null;
  return <div className="pointer-events-none absolute inset-0 -z-0">{children}</div>;
}
