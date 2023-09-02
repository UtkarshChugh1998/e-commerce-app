import React from 'react'
import { AddressInfo } from '../../../config/types'
import { Button } from '../../common/Button'

export type AddressDetailsProps = {
    address: AddressInfo,
    goToPage: Function
}
export const AddressDetails = (props: AddressDetailsProps) => {
    const { address, goToPage } = props
    return (
        <div style={{ padding: '5px' }}>
            <div className='addressDetailItem'>
                <div>City: </div>
                <div>{address.city}</div>
            </div>
            <div className='addressDetailItem'>
                <div>House Number: </div>
                <div>{address.number}</div>
            </div>
            <div className='addressDetailItem'>
                <div>Street: </div>
                <div>{address.street}</div>
            </div>
            <div className='addressDetailItem'>
                <div>ZipCode: </div>
                <div>{address.zipcode}</div>
            </div>
            <div className='addressDetailItem'>
                <div>Phone: </div>
                <div>{address.phone}</div>
            </div>
            <div>
                <Button variant='secondary' onClick={() => goToPage('address')}>Edit Address</Button>
            </div>
        </div>
    )
}