import { useEffect } from 'react'
import { urls } from './urlConfig'
import { ProductResponse } from '../components/pages/products/mockResponse'
import { ProductType } from '../config/types'
import { categoryName, getDiscount } from '../config/discount'

export const useProductList = (setData: any, isLoading: any) => {
    useEffect(() => {
        fetch(urls.GET_PRODUCT_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then((resp) => {
            isLoading.current = false
            const modifiedResp: ProductType[] = resp.map((product: ProductResponse) => {
                const discount = getDiscount(product)
                return { ...product, discount }
            })
            setData(modifiedResp)
        }).catch((error) => {
            isLoading.current = false
            console.log('Error', error)
        })
    }, [])

}