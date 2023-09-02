import React from 'react'
import { Button } from '../../common/Button'

export const AddAdress = (props: any) => {
    const { showForm } = props
    const addNewAddress = () => {
        showForm(true)
    }
    return (
        <div style={{ marginTop: '5px' }} >
            <Button variant='cta' onClick={addNewAddress}>+ Add Address</Button>
        </div>
    )
}