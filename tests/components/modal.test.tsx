import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Modal } from "@/components/modals/Modal";

function ModalHarness() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Test Modal"
      description="Modal description"
      trigger={<button type="button">Open Modal</button>}
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

  it("closes on Escape key", async () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(await screen.findByText("Modal body")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Modal body")).not.toBeInTheDocument();
  });
});
