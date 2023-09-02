import React from 'react'
import { Button } from '../../common/Button'

export const BuyNow = (props: any) => {
    const { handleBuy, disabled } = props
    const handleClick = () => {
        handleBuy()
    }
    return (
        <Button variant='primary' onClick={handleClick} disabled={disabled}>Buy Now</Button>

    )
}