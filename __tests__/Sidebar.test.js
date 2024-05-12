import Sidebar from "../app/components/Sidebar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Sidebar Component", () => {
  it("Side bar visibility", () => {
    render(<Sidebar />);

    const sidebar=screen.getByTestId("sidebar")
    expect(sidebar).toBeInTheDocument()
  });
  it("Menu bar toggle",()=>{
    render(<Sidebar/>)

    const menuButton = screen.queryByTestId("menubutton");
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(menuButton).not.toBeInTheDocument();
  })
});
