import React, { useEffect, useState } from 'react'
import { SelectedProducts } from '../../../config/types'
import { ProductResponse } from './mockResponse'
import { Button } from '../../common/Button'
import { BuyNow } from './BuyNow'

export type AddToCartProps = {
    productInfo: ProductResponse
    setSelectedProducts: Function
    currentQuantity: number
    handleBuy?: Function,
    isCheckoutOrBuy: boolean
}

export const AddtoCart = (props: any) => {
    const { productInfo, setSelectedProducts, currentQuantity, isCheckoutOrBuy } = props
    const [currentSelValue, setCurrVal] = useState<number>(currentQuantity)
    let childrenOptions = []
    for (let i = 1; i <= 8; i++) {
        childrenOptions.push(<option key={i} value={i}>{i}</option>)
    }
    const handleClick = () => {
        setSelectedProducts((prevState: SelectedProducts) => {
            const prodInfo = { ...productInfo, quantity: currentSelValue }
            return { ...prevState, [productInfo.id]: { ...prodInfo } }
        })
    }

    const clearCart = () => {
        setCurrVal(0)
        setSelectedProducts((prevState: SelectedProducts) => {
            const prodInfo = { ...prevState }
            delete prodInfo[productInfo.id]
            return { ...prodInfo }
        })

    }
    useEffect(() => {
        // If user in Buy page, or summary page, allow direct updation of cart using handleClick
        if (isCheckoutOrBuy)
            handleClick()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSelValue])
    const handleSelectVal = (e: any) => {
        setCurrVal(e.target.value)
    }
    return (
        <div className='addToCart'>
            <select value={currentSelValue} onChange={handleSelectVal}>
                <option value={0} disabled selected>Select your option</option>
                {[...childrenOptions]}
            </select>
            {(!isCheckoutOrBuy) && <Button variant='cta' disabled={currentSelValue === 0} onClick={handleClick}>{currentQuantity === 0 ? 'Add to Cart' : 'Update Cart'}</Button>}
            {currentQuantity > 0 && <Button variant='secondary' onClick={clearCart}>Clear Item</Button>}
            {(!isCheckoutOrBuy) &&
                < BuyNow handleBuy={() => props?.handleBuy(productInfo, currentSelValue)} disabled={currentSelValue === 0} />
            }
        </div>
    )
}