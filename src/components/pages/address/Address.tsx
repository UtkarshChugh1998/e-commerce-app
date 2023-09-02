import React, { MouseEventHandler } from 'react'
import { AddressInfo } from '../../../config/types'
import { RadioButton } from '../../common/RadioButton'
export type AddressProps = {
    address: AddressInfo,
    addressKey: number,
    setAddress: Function,
    selected: boolean
}

const getLabel = (address: AddressInfo, handleClick: MouseEventHandler<HTMLLabelElement>) => {
    const modifiedJsx = <label onClick={handleClick}>{`${address.number}, ${address.street}, ${address.city}, ${address.zipcode}`}</label>
    return modifiedJsx
}

export const Address = (props: AddressProps) => {
    const { address, addressKey, setAddress, selected } = props

    const handleClick = () => {
        setAddress(address)
    }
    const label = getLabel(address, handleClick)
    return (
        <div className='addressContainer'>
            <RadioButton onChange={handleClick} name='address' value={addressKey} label={label} checked={selected} />
        </div>
    )
}