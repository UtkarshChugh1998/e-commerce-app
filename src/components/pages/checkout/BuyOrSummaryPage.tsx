import React, { useEffect, useRef, useState } from 'react'
import { SelectedProducts } from '../../../config/types'
import { Product } from '../products/Product'
import { TotalPrice } from './TotalPrice'
import { getTotalAndUpdatedPrice } from '../../../config/configuration'
import { AddressDetails } from './AddressDetails'
import { Button } from '../../common/Button'

export const BuyOrSummaryPage = (props: any) => {
    const { formPayload, setFormPayload, name, goToPage, setValidationStatus } = props
    const { buyList, productList, addressData } = formPayload
    const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>(name === 'buy' ? buyList : productList)
    const { totalPrice, updatedPrice } = getTotalAndUpdatedPrice(selectedProducts)
    const productKey = useRef<string>(Object.keys(selectedProducts)[0])
    const totalProducts = Object.keys(selectedProducts).length

    useEffect(() => {
        // We need to update the buyList with the selected items.
        // But also update the cart as well.
        // This method handles cart updation for both buy and summary page.
        const currentSelectedProduct = selectedProducts[productKey.current]
        const currProductList = {
            ...formPayload.productList,
            [productKey.current]: currentSelectedProduct
        }
        if (!currentSelectedProduct) {
            delete currProductList[productKey.current]
        }

        setFormPayload({
            buyList: name === 'buy' ? selectedProducts : buyList,
            productList: {
                ...currProductList
            }
        })
        // Clearing buy payload on component unmount
        // return () => {
        //     setFormPayload({
        //         buyList: {}
        //     })
        // }
        if (Object.keys(selectedProducts).length === 0) {
            setValidationStatus(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts])

    const handleSelectedProducts = (id: string, selectedProducts: SelectedProducts) => {
        productKey.current = id
        setSelectedProducts(selectedProducts)
    }
    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
            <div className='right-separator flex-item'>
                <AddressDetails address={addressData} goToPage={goToPage} />
            </div>
            {totalProducts ? (

                <div className='flex-item product-details'>
                    {Object.keys(selectedProducts).map((key: string) => {
                        const product = selectedProducts[key]
                        return <Product isCheckoutOrBuy key={product.id} productInfo={product}
                            setSelectedProducts={(selectedProducts: SelectedProducts) => handleSelectedProducts(product.id, selectedProducts)} selectedProducts={selectedProducts} />
                    })}
                    <div>
                        <TotalPrice totalPrice={totalPrice} updatedPrice={updatedPrice} />
                    </div>
                </div>

            ) : (
                <div className='flex-item product-details'>
                    <h3>No items selected. Please go back to Products Page for selecting Items.</h3>
                    <Button variant='secondary' onClick={() => goToPage('products')}>Go To Products Page</Button>
                </div>
            )}
        </div >
    )
}