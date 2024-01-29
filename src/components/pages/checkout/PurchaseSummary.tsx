import React, { useEffect, useState } from 'react'
import { getTotalAndUpdatedPrice } from '../../../config/configuration'
import { Button } from '../../common/Button'

export const PurchaseSummary = (props: any) => {
    const { formPayload, clearPayloadAndLocalStorage, goToPage } = props
    const { purchaseStatus } = formPayload
    const { updatedPrice } = getTotalAndUpdatedPrice(formPayload.productList)
    const roundedValue = Math.round(updatedPrice * 100) / 100
    const handleReload = (e: any) => {
        // Will clear the localStorage, payload and then navigate to products.
        clearPayloadAndLocalStorage()
        goToPage('products')
    }
    const [purchaseStatusState, _] = useState<any>(purchaseStatus)
    useEffect(() => {
        window.addEventListener('beforeunload', handleReload)
        return () => {
            // Clearing on navigation
            window.removeEventListener('beforeunload', handleReload)
        }
    }, [])

    const handleNavigation = () => {
        clearPayloadAndLocalStorage()
        // navigate to products page.
        goToPage('products')
    }
    return (
        <div className='flex-item product-details'>
            {purchaseStatusState.status ? (
                <div>Success, your Order has been confirmed, total Price <b>$ {roundedValue}</b></div>
            ) : (
                <div>The order placed has been failed with error <b>{purchaseStatusState.error}</b>, kindly Retry or reach out to the <a href='/support' target='_blank'>abc@suppport.in</a></div>
            )}
            <Button variant='secondary' onClick={() => {
                handleNavigation()
            }}>Proceed to Home Page</Button>
        </div>
    )
}