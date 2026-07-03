import { render, screen } from "@testing-library/react";
import { FaqItem } from "@/components/details/FaqItem";

const item = {
  q: "When should I RSVP?",
  a: "Formal invitations will arrive later this year.",
};

describe("FaqItem", () => {
  it("renders the question and answer inside a native details/summary", () => {
    const { container } = render(<FaqItem item={item} />);

    const details = container.querySelector("details");
    expect(details).toBeInTheDocument();
    expect(details).not.toHaveAttribute("open");

    // Summary carries the question; the answer is present for no-JS/SEO.
    expect(screen.getByText(item.q)).toBeInTheDocument();
    expect(screen.getByText(item.a)).toBeInTheDocument();
    expect(container.querySelector("summary")).toBeInTheDocument();
  });

  it("uses the group-open variant to drive the marker (no JS toggle handler)", () => {
    const { container } = render(<FaqItem item={item} />);
    const marker = container.querySelector("summary span[aria-hidden]");
    expect(marker).toHaveTextContent("+");
    expect(marker?.className).toContain("group-open:rotate-45");
  });
});
