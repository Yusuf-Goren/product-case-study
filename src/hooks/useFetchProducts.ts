import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import React, { useEffect } from "react";
import { fetchProductsWithFilters } from "../state/product/productSlice";

export const useFetchProducts = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { productList, isLoading, isError, errorStatus, page, searchBrand, searchName, searchModel, sortBy, order, maxPageSize } = useSelector(
        (state: RootState) => state.product
    )

    const fetchData = () => {
        dispatch(fetchProductsWithFilters({ page, searchBrand, searchName, searchModel, sortBy, order, }));
    }
    useEffect(() => {
        fetchData()
    }, [sortBy, order, searchName, searchBrand, searchModel, sortBy, order]);




    return { productList, isLoading, isError, errorStatus, searchBrand, fetchData, maxPageSize };
};