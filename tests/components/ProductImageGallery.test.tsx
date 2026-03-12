import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should not render anything if no image urls passed", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render list of images when image urls are passed", () => {
    const imageUrls = ["img1", "img2", "img3"];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");

    expect(images.length).toBe(3);
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
    // images.forEach((img) => {
    //   expect(imageUrls).toContain(img.getAttribute("src"));
    // });
  });
});
