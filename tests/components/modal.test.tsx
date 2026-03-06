import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { Modal } from "@/components/modals/Modal";

function ModalHarness() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      eyebrow="Test Eyebrow"
      title="Test Modal"
      lede="Modal lede"
      description="Modal description"
      headerAdornment={<div>Adornment</div>}
      trigger={<button type="button">Open Modal</button>}
      contentClassName="test-content-class"
      bodyClassName="test-body-class"
    >
      <p>Modal body</p>
    </Modal>
  );
}

describe("Modal", () => {
  it("opens and closes from close control", async () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(await screen.findByText("Modal body")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Modal body")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(await screen.findByText("Modal body")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Modal body")).not.toBeInTheDocument();
  });

  it("closes on overlay click", async () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(await screen.findByText("Modal body")).toBeInTheDocument();

    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.pointerDown(overlay);
    fireEvent.click(overlay);
    await waitFor(() => expect(screen.queryByText("Modal body")).not.toBeInTheDocument());
  });

  it("renders the composed header API and layout hooks", async () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Open Modal" }));

    expect(await screen.findByText("Test Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Modal lede")).toBeInTheDocument();
    expect(screen.getByText("Adornment")).toBeInTheDocument();
    expect(screen.getByTestId("modal-content")).toHaveClass("test-content-class");
    expect(screen.getByTestId("modal-body")).toHaveClass("test-body-class");
  });
});
