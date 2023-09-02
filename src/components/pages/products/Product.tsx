import React, { useState } from 'react'
import './product-style.css'
import { AddtoCart } from './AddToCart'
import { ProductType, SelectedProducts } from '../../../config/types'
import { deepCheck, getUpdatedPrice } from '../../../config/configuration'
import { TotalPrice } from '../checkout/TotalPrice'
export type ProductProps = {
    productInfo: ProductType,
    setSelectedProducts: Function,
    selectedProducts: SelectedProducts,
    handleBuy?: Function,
    isCheckoutOrBuy?: boolean
}
export const Product = (props: ProductProps) => {
    const { productInfo, setSelectedProducts, selectedProducts, isCheckoutOrBuy } = props
    const productSelections = selectedProducts[productInfo.id]
    const currentQuantity = productSelections?.quantity || 0
    const { totalPrice, updatedPrice } = getUpdatedPrice(productInfo)
    console.log('Product rendered', productInfo.id)

    return (
        <>
            <div className='container'>
                <div className='imageContainer'><img className='image' src={productInfo.image} alt={productInfo.description} /></div>
                <div className='detailsContainer'>
                    <div className='title-category'>
                        <div className='title'>{productInfo.title}</div>
                        <div className='category'>{productInfo.category}</div>
                    </div>
                    {!isCheckoutOrBuy && <div className='description'>{productInfo.description}</div>}
                    <TotalPrice totalPrice={totalPrice} updatedPrice={updatedPrice} />
                    <AddtoCart isCheckoutOrBuy={isCheckoutOrBuy} handleBuy={props?.handleBuy} setSelectedProducts={setSelectedProducts} productInfo={productInfo} currentQuantity={currentQuantity} />
                </div>
            </div>
        </>
    )
}