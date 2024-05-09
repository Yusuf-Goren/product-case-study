import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeProductId } from "../state/product/productSlice";
import { AppDispatch, RootState } from "../state/store";
import { useFetchSingleProduct } from "../hooks/useFetchSingleProduct";
import { BeatLoader } from "react-spinners";
import SingleProductCard from "../components/Products/singleProductCard";

export default function ProductPage() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  dispatch(changeProductId(productId));
  const { isLoading } = useSelector((state: RootState) => state.product);
  const product = useFetchSingleProduct();

  return (
    <div>
      <div className="filter">
        {isLoading && (
          <div className="spinner">
            <BeatLoader color="#36d7b7" />
          </div>
        )}

        {product.product.name && !isLoading && (
          <SingleProductCard product={product.product} />
        )}
      </div>
    </div>
  );
}
