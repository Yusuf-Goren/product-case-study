import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import React, { useEffect } from "react";
import { fetchSingleProduct } from "../state/product/productSlice";

export const useFetchSingleProduct = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { product, isLoading, isError, productId } = useSelector(
        (state: RootState) => state.product
    )

    const fetchData = () => {
        dispatch(fetchSingleProduct(productId));
    }
    useEffect(() => {

        fetchData()
    }, [productId]);

    return { product, isLoading, isError, fetchData };
};