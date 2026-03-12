import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount (User profile)", () => {
  it("should render correct heading, edit button and user name when user is admin", () => {
    const adminUser: User = {
      id: 1,
      name: "own user",
      isAdmin: true,
    };

    render(<UserAccount user={adminUser} />);
    const heading = screen.getByRole("heading");
    const button = screen.getByRole("button");
    const nameDiv = screen.getByText("own user");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/user profile/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
    expect(nameDiv).toBeInTheDocument();
  });

  it("should not render edit button when current user is not admin", () => {
    const otherUser: User = {
      id: 2,
      name: "other user",
    };

    render(<UserAccount user={otherUser} />);
    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });
});
