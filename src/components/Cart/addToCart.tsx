import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../state/product/cartSlice";
export default function AddToCart({ product }: any) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(addProduct(product))}
      variant="contained"
      color="info"
    >
      Add to Cart
    </Button>
  );
}
