import { createSlice } from "@reduxjs/toolkit";
import { ProductTypeForCart, } from "../../types";

interface ProductState {
    cartProductList: ProductTypeForCart[],
    totalValue: number
}

const initialState: ProductState = {
    cartProductList: [],
    totalValue: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        deleteProduct: (state, action) => {
            const { id, price, count } = action.payload
            const i = state.cartProductList.findIndex(e => e.id === id);
            let tempProductList = state.cartProductList
            if (i > -1) {
                if (count === 1) {

                    tempProductList.splice(i, 1)

                }
                else tempProductList[i].count -= 1

                state.totalValue -= Number(price)
            }
            state.cartProductList = tempProductList

        },
        addProduct: (state, action) => {

            const { id, price } = action.payload
            let i = state.cartProductList?.findIndex(e => e.id === id);
            let tempProductList = state.cartProductList ?? []

            if (i > -1) {
                tempProductList[i].count += 1
            }
            else {
                const addedProduct = {
                    ...action.payload, count: 1
                }
                tempProductList.push(addedProduct)
            }
            state.totalValue += Number(price)
            state.cartProductList = tempProductList
        },


    },
})

export const { deleteProduct, addProduct } = cartSlice.actions

export default cartSlice.reducer