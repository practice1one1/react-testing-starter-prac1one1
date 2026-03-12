import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  it("should render short text without the show more button", () => {
    const text = "short text";

    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /\b(show less|show more)\b/i }),
    ).not.toBeInTheDocument();
  });

  it("should render very long text with ellipsis at end and the show more button", () => {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit ipsa omnis sint doloribus quam velit, odit natus, eum repellendus molestias vero atque exercitationem doloremque! Praesentium cumque dolorum et eligendi ab illo, rerum vitae nam corporis porro quod cum saepe nisi illum dolor aliquid animi quos inventore aliquam esse neque. Mollitia modi expedita ipsam quasi atque nemo assumenda laboriosam minima rerum dolore maiores sed praesentium quo recusandae ipsa dolorem, voluptatem at vero sapiente illo harum. Iure ipsam dignissimos architecto voluptatem, dolorem dolorum enim sapiente assumenda neque quae ipsum a quam delectus vitae non fuga dicta tempore libero eveniet quis voluptatibus? Perferendis";

    render(<ExpandableText text={text} />);

    expect(screen.getByRole("article")).toHaveTextContent(/\.\.\.$/);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/show more/i);
  });

  it("should expand text, hide ellipsis and change button text when show more button is cliked", async () => {
    const text =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit ipsa omnis sint doloribus quam velit, odit natus, eum repellendus molestias vero atque exercitationem doloremque! Praesentium cumque dolorum et eligendi ab illo, rerum vitae nam corporis porro quod cum saepe nisi illum dolor aliquid animi quos inventore aliquam esse neque. Mollitia modi expedita ipsam quasi atque nemo assumenda laboriosam minima rerum dolore maiores sed praesentium quo recusandae ipsa dolorem, voluptatem at vero sapiente illo harum. Iure ipsam dignissimos architecto voluptatem, dolorem dolorum enim sapiente assumenda neque quae ipsum a quam delectus vitae non fuga dicta tempore libero eveniet quis voluptatibus? Perferendis";

    render(<ExpandableText text={text} />);

    const user = userEvent.setup();
    const button = screen.getByRole("button");
    await user.click(button);

    const screenText = screen.getByRole("article");
    expect(screenText.textContent).toHaveLength(text.length);
    expect(screenText).not.toHaveTextContent(/\.\.\.$/);
    expect(button).toHaveTextContent(/show less/i);
  });
});
