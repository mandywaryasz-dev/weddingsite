import React from "react";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
  default: ({ alt = "", fill: _fill, quality: _quality, unoptimized: _unoptimized, ...props }: Record<string, unknown>) => (
    <img alt={alt as string} {...props} />
  ),
}));

vi.mock("@/components/scenes/Scene", () => ({
  Scene: ({ id, ornament, children }: { id: string; ornament?: React.ReactNode; children: React.ReactNode }) => (
    <section id={id}>
      {ornament}
      {children}
    </section>
  ),
}));

vi.mock("@/components/motion/ScrollSequence", () => ({
  ScrollSequence: ({ children }: { children: React.ReactNode }) => <div data-testid="scroll-sequence">{children}</div>,
}));

vi.mock("@/components/motion/ScrollSequenceItem", () => ({
  ScrollSequenceItem: ({
    as = "div",
    children,
    className,
  }: {
    as?: "div" | "span" | "p";
    children: React.ReactNode;
    className?: string;
  }) => {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  },
}));

import { CulturalScene } from "@/components/scenes/CulturalScene";
import { sceneManifest } from "@/lib/scenes/manifest";

describe("CulturalScene", () => {
  it("renders the split vow lines, Hindi echo, and decorative ornaments", () => {
    const scene = sceneManifest.find((entry) => entry.id === "cultural");

    expect(scene).toBeDefined();

    const { container } = render(
      <CulturalScene
        scene={scene!}
        actions={{
          openVenue: vi.fn(),
          openPhotos: vi.fn(),
          openMusic: vi.fn(),
        }}
      />
    );

    expect(screen.getByText("I am yours.")).toBeInTheDocument();
    expect(screen.getByText("You are mine.")).toBeInTheDocument();
    expect(screen.getByText("मैं तुम्हारा हूँ। तुम मेरी हो। आओ, साथ चलें।")).toBeInTheDocument();

    expect(container.querySelector('img[src="/images/bg-texture.png"]')).toBeInTheDocument();
    expect(container.querySelector('img[src="/images/lotus.svg"]')).toBeInTheDocument();
    expect(container.querySelector('img[src="/images/culture-flower.svg"]')).toBeInTheDocument();
  });
});
