import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProductImage from "../../images/not-found.png";
import AddToCart from "../Cart/addToCart";

export default function ProductCard({ product }: any) {
  const navigate = useNavigate();
  return (
    <div className="product-cart">
      <img
        onClick={() => {
          return navigate(`product-page/${product.id}`);
        }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = defaultProductImage;
        }}
        src={product.image}
        alt="product-image"
      />
      <div className="product-price"> {product.price} ₺ </div>
      <div className="product-name"> {product.name} </div>
      <AddToCart product={product} />
    </div>
  );
}
