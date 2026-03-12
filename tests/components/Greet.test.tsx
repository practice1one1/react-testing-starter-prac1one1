import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render h1 with greet message and name when name is provided", () => {
    render(<Greet name="Radhe Krishna" />);

    const elem = screen.getByRole("heading");

    expect(elem).toBeInTheDocument();
    expect(elem).toHaveTextContent(/radhe krishna/i);
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const elem = screen.getByRole("button");

    expect(elem).toBeInTheDocument();
    expect(elem).toHaveTextContent(/login/i);
  });
});
