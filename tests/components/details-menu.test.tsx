import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuOverlay } from "@/components/details/MenuOverlay";

vi.mock("next/image", () => ({
  default: ({ alt = "", fill: _fill, quality: _quality, ...props }: Record<string, unknown>) => (
    <img alt={alt as string} {...props} />
  ),
}));

const menu = {
  links: [
    { label: "The Events", href: "#events" },
    { label: "FAQ", href: "#faq" },
  ],
  email: { label: "HELLO@MEETUSINASHEVILLE.COM", href: "mailto:hello@meetusinasheville.com" },
};

describe("MenuOverlay", () => {
  it("is hidden when closed and shown when open", () => {
    const { rerender } = render(
      <MenuOverlay open={false} onClose={() => undefined} links={menu.links} email={menu.email} />
    );
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toHaveAttribute("aria-hidden", "true");
    expect(dialog.className).toContain("opacity-0");

    rerender(
      <MenuOverlay open onClose={() => undefined} links={menu.links} email={menu.email} />
    );
    expect(dialog).toHaveAttribute("aria-hidden", "false");
    expect(dialog.className).toContain("opacity-100");
  });

  it("locks body scroll while open and restores it on close", () => {
    const { rerender } = render(
      <MenuOverlay open onClose={() => undefined} links={menu.links} email={menu.email} />
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <MenuOverlay open={false} onClose={() => undefined} links={menu.links} email={menu.email} />
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on link click and on Escape", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<MenuOverlay open onClose={onClose} links={menu.links} email={menu.email} />);

    await user.click(screen.getByRole("link", { name: "The Events" }));
    expect(onClose).toHaveBeenCalledOnce();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
