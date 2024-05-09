import React from "react";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import ProductCardList from "./productCardList";
import ProductListPagination from "./productListPagination";
import noData from "../../images/no-data.avif";

export default function ProductCardListContainer() {
  const { productList, isError, isLoading, maxPageSize } = useFetchProducts();

  return (
    <div className="product-list-section">
      {productList && productList.length > 0 && !isLoading && !isError ? (
        <>
          <ProductCardList productList={productList} />
          {maxPageSize > 1 && (
            <div className="pagination-wrapper">
              <ProductListPagination />
            </div>
          )}
        </>
      ) : (
        !isLoading &&
        isError && (
          <div className="no-data-wrapper">
            <div className="no-data-text">
              There is no product with this filter(s)
            </div>
            <img height={500} src={noData} alt="" />
          </div>
        )
      )}
    </div>
  );
}
