import Player from "../app/components/Player/Player";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Player Component", () => {
  it("render the Player component", () => {
    render(<Player />);

    const videoElement = screen.getByTestId("video");

    expect(videoElement).toBeInTheDocument();
  });
});
