import { render, screen } from "@testing-library/react";
import { VenueModal } from "@/components/modals/VenueModal";

vi.mock("next/image", () => ({
  default: ({ alt = "", fill: _fill, quality: _quality, ...props }: Record<string, unknown>) => (
    <img alt={alt as string} {...props} />
  ),
}));

describe("VenueModal", () => {
  it("renders Haiku as the title with Asheville as the smaller secondary label", () => {
    render(<VenueModal open onOpenChange={() => undefined} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Haiku" })).toBeInTheDocument();
    expect(screen.getAllByText("Haiku", { exact: true })).toHaveLength(1);
    expect(screen.getByText("Asheville")).toBeInTheDocument();
    expect(screen.queryByText("The Venue")).not.toBeInTheDocument();
  });
});
