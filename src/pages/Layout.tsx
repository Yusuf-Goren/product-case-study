import React from "react";
import { BeatLoader } from "react-spinners";

import Filters from "../components/filters";
import ProductCardListContainer from "../components/Products/productCardListContainer";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import CartContainer from "../components/Cart/cartContainer";

export default function Layout() {
  const { isLoading } = useSelector((state: RootState) => state.product);

  return (
    <div className="products-container">
      <div className="products-section">
        <Filters />
        <ProductCardListContainer />

        <CartContainer />

        {isLoading && (
          <div className="spinner">
            <BeatLoader color="#36d7b7" />
          </div>
        )}
      </div>
    </div>
  );
}
