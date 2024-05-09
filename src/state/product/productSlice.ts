import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterType, ProductType, SingleProductType, initialStateSingleProductType, } from "../../types";
import axios from "axios";


interface ProductState {
    productListAll: ProductType[],
    productList: ProductType[],
    searchName: string;
    searchBrand: string;
    searchModel: string,
    isLoading: boolean,
    isError: boolean,
    errorStatus: string,
    page: number,
    maxPageSize: number,
    product: SingleProductType,
    productId: string,
    modelList: string[],
    brandList: string[],
    sortBy: string,
    order: "asc" | "desc" | ""
}

const initialState: ProductState = {
    productListAll: [],
    productList: [],
    searchName: "",
    searchBrand: "",
    searchModel: "",
    isLoading: false,
    isError: false,
    errorStatus: "",
    page: 1,
    maxPageSize: 1,
    product: initialStateSingleProductType,
    productId: "",
    modelList: [],
    brandList: [],
    sortBy: "",
    order: ""

}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        changePage: (state, action) => {
            if (action.payload > 0 && action.payload <= state.maxPageSize) {
                state.page = action.payload
                let tempProductList = state.productListAll
                let newProductList = tempProductList.slice((state.page - 1) * 12, action.payload * 12)
                state.productList = newProductList
            }
        },
        changeModelFilter: (state, action) => {
            const { ischecked, value } = action.payload
            state.searchModel = ischecked ? value : ""
        },
        changeBrandFilter: (state, action) => {
            const { ischecked, value } = action.payload
            state.searchBrand = ischecked ? value : ""
        },
        changeNameFilter: (state, action) => {

            const value = action.payload
            state.searchName = value
        },
        changeSortFilter: (state, action) => {
            const value = action.payload
            if (value === "1") {
                state.sortBy = "createdAt"
                state.order = "asc"
            }
            else if (value === "2") {
                state.sortBy = "createdAt"
                state.order = "desc"
            }
            else if (value === "3") {
                state.sortBy = "price"
                state.order = "asc"
            }
            else if (value === "4") {
                state.sortBy = "price"
                state.order = "desc"
            }

        },
        changeProductId: (state, action) => {
            state.productId = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsWithFilters.pending, (state, action) => {

            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(fetchProductsWithFilters.fulfilled, (state, action) => {

            state.isError = false;
            state.productListAll = action.payload

            let tempProductList = action.payload

            if (state.searchModel) {
                tempProductList = tempProductList.filter((product: ProductType) => product.model === state.searchModel)
            }

            if (state.searchBrand) {
                tempProductList = tempProductList.filter((product: ProductType) => product.brand === state.searchBrand)
            }

            state.maxPageSize = Math.ceil(tempProductList.length / 12)
            let newProductList = tempProductList.slice((state.page - 1) * 12, state.page * 12)
            state.product = initialStateSingleProductType
            state.page = 1
            state.productList = newProductList

            let tempBrandList: string[] = []
            let tempModelList: string[] = []

            state.productListAll.map((product: ProductType) => {
                if (!tempBrandList.includes(product.brand)) {
                    tempBrandList.push(product.brand)
                }
                if (!tempModelList.includes(product.model)) {
                    tempModelList.push(product.model)
                }
            })
            state.brandList = tempBrandList
            state.modelList = tempModelList

            state.isLoading = false;


        })
        builder.addCase(fetchProductsWithFilters.rejected, (state, action) => {

            state.isError = true;
            state.isLoading = false;
            state.productListAll = [];
            state.productList = [];
            state.maxPageSize = 0
        })
        builder.addCase(fetchSingleProduct.pending, (state, action) => {

            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {

            state.isError = false;
            state.product = action.payload

            state.isLoading = false;


        })
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.productList = [];
        })
    }
})
export const { changePage, changeModelFilter, changeBrandFilter, changeNameFilter, changeProductId, changeSortFilter } = productSlice.actions

export default productSlice.reducer

export const fetchProductsWithFilters = createAsyncThunk(
    "fetchProductsWithFilters",

    async (filter: FilterType) => {
        const { searchName, sortBy, order } = filter

        let apiUrl = `${process.env.REACT_APP_API_BASE_URL}?`;

        if (searchName) {
            apiUrl += `&name=${searchName}`;
        }

        if (sortBy && order) {
            apiUrl += `&sortBy=${sortBy}&order=${order}`
        }

        const response = await axios.get(apiUrl)

        const retrunValue = response?.data.length > 0 ? response.data : response

        return retrunValue
    }
)

export const fetchSingleProduct = createAsyncThunk(
    "fetchSingleProduct",

    async (productId: string) => {

        let apiUrl = `${process.env.REACT_APP_API_BASE_URL}/${productId}`;

        const response = await axios.get(apiUrl)

        return response.data
    }
)