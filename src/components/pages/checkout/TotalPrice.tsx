import React from 'react'

export const TotalPrice = (props: any) => {
    const { totalPrice, updatedPrice } = props
    const roundedValue = Math.round(updatedPrice * 100) / 100
    const roundedTotalValue = Math.round(totalPrice * 100) / 100
    return (
        <div style={{ margin: '5px 0 5px 0' }}>
            {totalPrice !== updatedPrice ? (
                <div>Price: <span style={{ textDecoration: 'line-through' }}>{roundedTotalValue}</span> <span>{roundedValue}</span></div>
            ) : (
                <div>Price: {totalPrice}</div>
            )}
        </div>
    )
}