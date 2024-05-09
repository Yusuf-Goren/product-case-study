import { Pagination } from "@mui/material";
import React from "react";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { changePage } from "../../state/product/productSlice";

export default function ProductListPagination() {
  const { page, maxPageSize } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: any, value: any) => {
    dispatch(changePage(value));
  };
  return <Pagination count={maxPageSize} page={page} onChange={handleChange} />;
}
