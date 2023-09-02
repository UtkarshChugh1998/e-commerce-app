import React from 'react'
import { DynaPage } from './DynaPage'
import { ProductList } from './pages/products/ProductList'
import { AddressPage } from './pages/address/AddressPage'
import { CheckOutPage } from './pages/checkout/CheckoutPage'
import { getConfig } from '../config/configuration'
import { BuyOrSummaryPage } from './pages/checkout/BuyOrSummaryPage'
import { PurchaseSummary } from './pages/checkout/PurchaseSummary'

export const ProductCheckoutForm = () => {
    const { initialStep, pages } = getConfig()
    return (
        <DynaPage initialStep={initialStep} pages={pages}>
            <ProductList key='product' name='products' />
            <AddressPage key='address' name='address' />
            <AddressPage key='address' name='addressForBuy' />
            <CheckOutPage key='checkout' name='checkout' />
            <BuyOrSummaryPage key='buy' name='buy' />
            <BuyOrSummaryPage key='buy' name='summary' />
            <PurchaseSummary key='purchase' name='purchase' />
        </DynaPage>
    )
}