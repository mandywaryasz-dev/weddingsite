import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DetailsNav } from "@/components/details/DetailsNav";

describe("DetailsNav", () => {
  it("is transparent at the top and frosted once scrolled", () => {
    const { rerender, container } = render(
      <DetailsNav scrolled={false} menuOpen={false} onOpenMenu={() => undefined} />
    );
    const nav = container.querySelector("nav")!;
    expect(nav.className).toContain("bg-transparent");
    expect(nav.className).not.toContain("backdrop-blur-[10px]");

    rerender(<DetailsNav scrolled menuOpen={false} onOpenMenu={() => undefined} />);
    expect(nav.className).toContain("backdrop-blur-[10px]");
  });

  it("reflects menu state via aria-expanded and fires onOpenMenu", async () => {
    const onOpenMenu = vi.fn();
    const user = userEvent.setup();
    render(<DetailsNav scrolled={false} menuOpen={false} onOpenMenu={onOpenMenu} />);

    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(onOpenMenu).toHaveBeenCalledOnce();
  });
});
