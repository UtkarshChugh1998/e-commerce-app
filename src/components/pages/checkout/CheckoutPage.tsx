import React, { useEffect, useState } from 'react'
import { Product } from '../products/Product'
import { SelectedProducts } from '../../../config/types'
import { TotalPrice } from './TotalPrice'
import { getTotalAndUpdatedPrice } from '../../../config/configuration'
import { Button } from '../../common/Button'

export const CheckOutPage = (props: any) => {
    const { formPayload, setFormPayload, goToPage, setValidationStatus } = props
    const { productList } = formPayload
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>(productList)
    const { totalPrice, updatedPrice } = getTotalAndUpdatedPrice(selectedProducts)
    const totalProducts = Object.keys(selectedProducts).length
    useEffect(() => {
        setFormPayload({
            productList: selectedProducts
        })
        if (Object.keys(selectedProducts).length === 0)
            setValidationStatus(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts])
    return (
        <div>
            {totalProducts > 0 ? (<>
                {Object.keys(selectedProducts).map((key: string) => {
                    const product = productList[key]
                    return <Product isCheckoutOrBuy key={product.id} productInfo={product} setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />
                })}
                <div className='priceContainer'>
                    <TotalPrice totalPrice={totalPrice} updatedPrice={updatedPrice} />
                </div>
            </>
            ) : (
                <div className='flex-item product-details'>
                    <h3>No items selected. Please go back to Products Page for selecting Items.</h3>
                    <Button variant='secondary' onClick={() => goToPage('products')}>Go To Products Page</Button>
                </div>
            )}
        </div>
    )
}