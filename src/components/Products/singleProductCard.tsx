import { Card, CardContent } from "@mui/material";
import React from "react";

import CartContainer from "../Cart/cartContainer";
import defaultProductImage from "../../images/not-found.png";
import AddToCart from "../Cart/addToCart";

export default function SingleProductCard({ product }: any) {
  return (
    <div className="single-product-container">
      <div className="products-section">
        <div className="single-product">
          <Card>
            <CardContent className="d-flex-row">
              <img
                src={product.image}
                alt={product.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultProductImage;
                }}
              />

              <div className="product-info">
                {product.name}
                <br />
                <span className="product-price">{product.price} ₺</span>
                <AddToCart product={product} />
                <div className="product-desc"> {product.description}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <CartContainer />
      </div>
    </div>
  );
}
