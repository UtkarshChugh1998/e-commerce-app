import { AddressInfo, AddressKeys, Price, ProductType, SelectedProducts } from "./types"

export const getConfig = (): Configuration => ({
    initialStep: 'products',
    pages: {
        default: {
            identifier: 'default',
            title: 'Products Page',
            previous: null,
            next: 'address',
            nextTitle: 'Continue >>>'
        },
        products: {
            identifier: 'products',
            nextTitle: 'Checkout',
            title: 'Products Page',
            previous: null,
            next: 'checkout'
        },
        address: {
            identifier: 'address',
            title: 'Address Page',
            previous: 'checkout',
            next: 'summary',
            nextTitle: 'Proceed to Summary Page',
            prevTitle: 'Go to checkout'
        },
        addressForBuy: {
            identifier: 'addressForBuy',
            title: 'Address Page',
            previous: 'products',
            next: 'buy',
            nextTitle: 'Proceed to Buy Page',
            prevTitle: 'View Products'
        },
        checkout: {
            identifier: 'checkout',
            title: 'Checkout Page',
            previous: 'products',
            prevTitle: 'View Products',
            next: 'address',
            nextTitle: 'View Address'
        },
        buy: {
            identifier: 'buy',
            title: 'Buy Page',
            previous: 'addressForBuy',
            prevTitle: 'View Address',
            goTos: [
                {
                    identifier: 'products',
                    title: 'Go to Products Page'
                }
            ],
            next: null,
            finishTitle: 'Proceed to Buy'

        },
        summary: {
            identifier: 'summary',
            title: 'Summary Page',
            previous: 'address',
            prevTitle: 'View Address',
            goTos: [
                {
                    identifier: 'products',
                    title: 'Go to Products Page'
                }
            ],
            next: null,
            finishTitle: 'Proceed to Buy'

        },
        purchase: {
            identifier: 'purchase',
            title: 'Purchase Summary',
            previous: null,
            next: null,
        }
    }
})
export const addressExists = (addressArr: AddressInfo[], address: AddressInfo) => {
    const val = addressArr?.some((add: AddressInfo) => Object.keys(add).every((key: string) => {
        const objKey = key as AddressKeys
        if (objKey === 'id') {
            return true
        }
        console.log('Equality Check', objKey, add, address, deepCheck(add[objKey], address[objKey]))
        return deepCheck(add[objKey], address[objKey])
    }))
    console.log('Value is', val)
    return val
}
export const deepCheck = (val1: any, val2: any): boolean => {
    if (val1 === val2) {
        return true
    }
    if (typeof val1 === 'function' && typeof val2 === 'function') {
        return true
    }
    if (typeof val1 !== typeof val2) {
        console.log('Failed here', val1, val2)
        return false
    }
    if (typeof val1 === typeof val2 && typeof val1 !== 'object') {
        console.log('Comparing here', val1, val2, val1 === val2)
        return val1 === val2
    }

    // If both are objects.
    return Object.keys(val1).every((key: any) => deepCheck(val1[key], val2[key]))

}
type Configuration = {
    initialStep: string,
    pages: Record<string, PageConfig>
}
export type PageConfig = {
    identifier: string,
    title: string,
    previous: string | null
    next: string | null
    nextTitle?: string
    prevTitle?: string
    finishTitle?: string
    goTos?: any[]
}


export const DEFAULT_ADDRESS: AddressInfo = {
    city: '',
    street: '',
    number: 0,
    zipcode: '',
    geoLocation: {
        lat: '0',
        long: '0'
    },
    phone: '',
    id: 0
}


export function getTotalAndUpdatedPrice(selectedProducts: SelectedProducts): Price {
    const price = Object.keys(selectedProducts).reduce((acc, key) => {

        const price: number = +selectedProducts[key].price
        const quantity = selectedProducts[key].quantity
        const discountPercent = selectedProducts[key].discount
        const discountedPrice = price - (discountPercent * price) / 100;
        const totalPrice = price * quantity
        const totalDiscountedPrice = discountedPrice * quantity
        return { totalPrice: acc.totalPrice + totalPrice, updatedPrice: acc.updatedPrice + totalDiscountedPrice }
    }, { totalPrice: 0, updatedPrice: 0 })
    return price
}
export function getUpdatedPrice(product: ProductType): Price {
    const price: number = +product.price
    const discountPercent = product.discount
    const discountedPrice = price - (discountPercent * price) / 100;
    return { totalPrice: price, updatedPrice: discountedPrice }
}
