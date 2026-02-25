import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SaveTheDateExperience } from "@/app/save-the-date/save-the-date-experience";

describe("SaveTheDateExperience", () => {
  it("opens mapped explore modals", async () => {
    render(<SaveTheDateExperience />);

    fireEvent.click(screen.getByRole("button", { name: "The Venue" }));
    expect(await screen.findByRole("heading", { name: "The Venue" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    fireEvent.click(screen.getByRole("button", { name: "Our Story" }));
    expect(await screen.findByRole("heading", { name: "Our Story" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    fireEvent.click(screen.getByRole("button", { name: "The Party" }));
    expect(await screen.findByRole("heading", { name: "The Party" })).toBeInTheDocument();
  });
});
