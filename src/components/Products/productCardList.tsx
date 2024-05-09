import React from "react";
import { ProductType } from "../../types";
import ProductCard from "./productCard";

export default function ProductCardList({ productList }: any) {
  return (
    <div className="product-list-container">
      {productList.map((product: ProductType) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
