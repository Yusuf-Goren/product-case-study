import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { ProductTypeForCart } from "../../types";
import { addProduct, deleteProduct } from "../../state/product/cartSlice";

export default function CartContainer({}) {
  const { cartProductList, totalValue } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="cart-container">
      <Card sx={{ width: "100%" }}>
        <CardContent>
          {cartProductList.length > 0 ? (
            cartProductList.map((product: ProductTypeForCart) => (
              <div key={product.id} className="card-item-container">
                <div className="card-item">
                  <div> {product.name} </div>
                  <div className="product-price"> {product.price} ₺ </div>
                </div>

                <div className="quantity">
                  <button
                    onClick={() => dispatch(deleteProduct(product))}
                    type="button"
                    name="button"
                  >
                    <RemoveIcon fontSize="small" />
                  </button>
                  <div> {product.count} </div>
                  <button
                    onClick={() => dispatch(addProduct(product))}
                    type="button"
                    name="button"
                  >
                    <AddIcon fontSize="small" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="card-item-container">
              Please add any item to basket
            </div>
          )}
        </CardContent>
      </Card>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <div className="checkout">
            <div>
              Total Price: <span> {totalValue + ".00"} ₺ </span>
            </div>
            <Button variant="contained">Checkout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
