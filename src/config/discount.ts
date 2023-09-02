import { ProductResponse } from "../components/pages/products/mockResponse";

export enum categoryDiscount {
    MENS_CLOTHING = 20,
    WOMENS_CLOTHING = 50,
    JEWELERY = 0,
    ELECTRONICS = 15
}

export enum categoryName {
    MENS_CLOTHING = 'men\'s clothing',
    WOMENS_CLOTHING = 'women\'s clothing',
    JEWELERY = 'jewelry',
    ELECTRONICS = 'electronics'
}

export const getDiscount = (product: ProductResponse) => {
    switch (product.category.toLowerCase()) {
        case categoryName.MENS_CLOTHING: {
            return categoryDiscount.MENS_CLOTHING
        }
        case categoryName.WOMENS_CLOTHING: {
            return categoryDiscount.WOMENS_CLOTHING
        }
        case categoryName.ELECTRONICS: {
            return categoryDiscount.ELECTRONICS
        }
        case categoryName.JEWELERY: {
            return categoryDiscount.JEWELERY
        }
        default: {
            return 0
        }
    }
}