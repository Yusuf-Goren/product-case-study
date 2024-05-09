import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProductCard from "../components/Products/productCard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Mocking useDispatch and useNavigate
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Test Product",
    price: 10,
    image: "test-image-url",
  };

  beforeEach(() => {
    useDispatch.mockClear();
    useNavigate.mockClear();
  });

  it("renders product details correctly", () => {
    const { getByText, getByAltText } = render(
      <ProductCard product={product} />
    );

    // Assert that product name, price, and image are rendered correctly
    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("10 ₺")).toBeInTheDocument();
    expect(getByAltText("product-image")).toBeInTheDocument();
  });

  it("triggers navigation when image is clicked", () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { getByAltText } = render(<ProductCard product={product} />);

    // Simulate click on the product image
    fireEvent.click(getByAltText("product-image"));

    // Assert that useNavigate hook is called with the correct URL
    expect(useNavigate).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("product-page/1");
  });

  // You can write more test cases for other interactions, such as clicking Add to Cart button
});
