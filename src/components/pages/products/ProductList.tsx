import React, { useEffect, useRef, useState } from 'react'
import { useProductList } from '../../../hooks/useProductList'
import { Product } from './Product'
import { ProductType, SelectedProducts } from '../../../config/types'
import { Loader } from '../../common/Loader'
import { SearchFilter } from './SearchFilter'

export const ProductList = (props: any) => {
    const { setFormPayload, formPayload, setValidationStatus, goToPage } = props
    const isLoading = useRef<boolean>(true)
    const [data, setData] = useState<ProductType[]>([] as any[])
    const [filterData, setFilterData] = useState<ProductType[]>([] as any[])
    const [filterValue, setFilterValue] = useState<string>('')
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>(formPayload?.productList || {})
    console.log('Product list rendered', selectedProducts)
    useEffect(() => {
        setFormPayload({
            productList: selectedProducts
        })
        if (Object.keys(selectedProducts).length !== 0) {
            setValidationStatus(true)
        }
        else {
            setValidationStatus(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts])

    useEffect(() => {
        if (filterValue) {
            const filteredData = data.filter((product: ProductType) => product.title?.toLowerCase()?.includes(filterValue.toLowerCase()) || product.category?.toLowerCase()?.includes(filterValue.toLowerCase()))
            setFilterData(filteredData)
        }
        else {
            setFilterData(data)
        }
    }, [filterValue, data])
    // Handle Immediate buy of a product.
    const handleBuy = (product: ProductType, quantity: number) => {
        let buyPayload = {}
        const productList = formPayload.productList
        let productListCurrent = formPayload.productList

        // Updating cart, and buyPayload.
        if (!productList[product.id]) {
            const selectedProduct = { ...product, quantity: quantity }
            buyPayload = { [product.id]: selectedProduct }
            productListCurrent = { ...productList, [product.id]: selectedProduct }
        }
        else {
            const currentProductState = productList[product.id]
            buyPayload = { [product.id]: { ...currentProductState, quantity: quantity } }
            productListCurrent = {
                ...productList, [product.id]: {
                    ...currentProductState,
                    quantity: quantity
                }
            }
        }
        console.log('BuyList', buyPayload, product, quantity)
        // Updating form payload, and setting validation to true
        setFormPayload({
            buyList: buyPayload,
            productList: productListCurrent
        })

        setValidationStatus(true)

        // Navigating to address Page.
        goToPage('addressForBuy')
    }

    useProductList(setData, isLoading)
    return (
        <div className='productListContainer'>
            <SearchFilter setFilterValue={setFilterValue} />
            {isLoading.current ? (
                <Loader />
            ) : (
                <div className='productsList'>
                    {filterData?.map((product) => (
                        <Product key={product.id} productInfo={product} setSelectedProducts={setSelectedProducts}
                            handleBuy={handleBuy} selectedProducts={selectedProducts} />
                    ))}
                </div>
            )}
        </div >
    )
}