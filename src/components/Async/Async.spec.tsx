import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Async } from ".";

test("render", async () => {
    render(<Async />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
    // expect(await screen.findByText("Button")).toBeInTheDocument();

    await waitFor(() => {
        return expect(screen.getByText("Button")).toBeInTheDocument();
    });
});
