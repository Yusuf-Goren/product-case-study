export type ProductState = {
    productList: ProductType[],
    isLoading: boolean,
    isError: boolean,
    page: number,
    maxPageSize: number,
    searchType: string,
    searchYear: number,
    searchName: string
};

export type ProductType = {
    createdAt: string;
    name: string,
    image: string,
    price: string,
    description: string,
    brand: string,
    model: string,
    id: string,
};

export type ProductTypeForCart = {
    createdAt: string;
    name: string,
    image: string,
    price: string,
    description: string,
    brand: string,
    model: string,
    id: string,
    count: number,
};

export type FilterType = {
    page: number,
    searchModel: string,
    searchName: string,
    searchBrand: string
    sortBy: string
    order: string
}

export type SingleProductType = {
    name: string,
    createdAt: string,
    image: string,
    price: string,
    description: string,
    model: string,
    brand: string,
    id: string,

};


export const initialStateSingleProductType: SingleProductType = {
    name: "",
    createdAt: "",
    image: "",
    price: "",
    description: "",
    model: "",
    brand: "",
    id: "",
};