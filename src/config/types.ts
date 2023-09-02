import { ProductResponse } from "../components/pages/products/mockResponse"

export interface ProductType extends ProductResponse {
    quantity: number,
    discount: number
}

export type SelectedProducts = {
    [key: string]: ProductType
}


export type UserInfo = {
    id: number,
    email: string,
    username: string,
    password: string,
    name: UserName,
    address: AddressInfo,
    phone: String
}

type UserName = {
    firstName: string,
    lastName: string
}

export type AddressInfo = {
    id: number
    city: string,
    street: string,
    number: number | null,
    zipcode: string,
    geoLocation?: Coordinates,
    phone: string
}

export type AddressKeys = keyof AddressInfo
type Coordinates = {
    lat: string,
    long: string
}

export type Price = {
    totalPrice: number,
    updatedPrice: number
}