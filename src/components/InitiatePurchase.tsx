import React, { useState } from 'react'
import { urls } from '../hooks/urlConfig'
import { Loader } from './common/Loader'
import { Button } from './common/Button'

export const InitiatePurchase = (props: any) => {
    const { setFormPayload, formPayload, goTo, validationStatus } = props
    const [isLoading, setLoading] = useState<boolean>(false)
    const productList = formPayload.productList
    const firstProduct = productList[Object.keys(productList)[0]]
    const handleClick = () => {
        const reqBody = {
            ...firstProduct
        }
        setLoading(true)
        fetch(urls.INITIATE_PURCHASE, {
            method: 'PUT',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res: any) => {
            const response = await res.json()
            // We've received confirmation of Success.
            setLoading(false)
            setFormPayload({
                purchaseStatus: {
                    status: true,
                    response: response,
                    error: null
                }
            })

            // Navigate to Purchase Confirmation Page.
            goTo('purchase')
        }).catch((error) => {
            setLoading(false)
            setFormPayload({
                purchaseStatus: {
                    status: false,
                    response: null,
                    error: error.message
                }
            })
            // Navigate to Purchase confirmation page.
            goTo('purchase')
        })
    }
    return (
        <div>
            {isLoading && <Loader />}
            <Button disabled={!validationStatus} variant='secondary' onClick={handleClick}>Initiate Purchase</Button>
        </div>
    )
}