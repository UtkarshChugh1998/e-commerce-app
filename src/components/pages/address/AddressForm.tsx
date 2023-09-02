import React, { useCallback, useEffect, useState } from "react";
import { AddressInfo } from "../../../config/types";
import { DEFAULT_ADDRESS } from "../../../config/configuration";
import { Button } from "../../common/Button";

export const AddressForm = (props: any) => {
    const [address, setAddressVal] = useState<AddressInfo>(DEFAULT_ADDRESS)
    const { setValidation, setAddressData, showForm } = props
    const [isFormValid, setFormValid] = useState<boolean>(false)
    const handleChange = (e: any) => {
        const fieldName = e.target.name
        const fieldVal = e.target.value
        setAddressVal((prev: AddressInfo) => {
            return { ...prev, [fieldName]: fieldVal }
        })
    }

    const isNonEmpty = useCallback((obj: any): boolean => {
        if (obj === null || obj === undefined) {
            return false
        }
        if (typeof obj !== 'object') {
            return !!obj || obj === 0
        }
        // else return 
        return Object.keys(obj).every((key: any) => isNonEmpty(obj[key]))
    }, [])

    useEffect(() => {
        const isFormComplete = isNonEmpty(address)
        // Page validation will only be true, when form is closed.
        setFormValid(isFormComplete)
    }, [address, isNonEmpty, setValidation])

    const handleSubmit = (e: any) => {
        // Prevent re-load of the page
        e.preventDefault()
        setAddressData(address)
        // Set form Show to false.
        showForm(false)
        setValidation(true)
    }
    const handleCancel = () => {
        showForm(false)
        setValidation(true)
    }
    return (
        <form>
            <div className='addressForm'>
                <InputField name='city' type='text' placeholder='Enter City' onChange={handleChange} label='City: ' required />
                <InputField name='street' type='text' placeholder='Enter Street' onChange={handleChange} label='Street: ' />
                <InputField name='number' type='text' placeholder='Enter House #' onChange={handleChange} pattern='[0-9]{1,5}' label='House Number: ' />
                <InputField name='zipcode' type='text' placeholder='Enter ZipCode' onChange={handleChange} pattern='[0-9]{6}' label='Zip Code: ' />
                <InputField name='phone' type='text' placeholder='Enter Phone #' onChange={handleChange} pattern='[0-9]{10}' label='Phone: ' />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant='primary' disabled={!isFormValid} onClick={handleSubmit}>Submit</Button>
                    <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
                </div>
            </div>

        </form>
    )
}

const InputField = (props: any) => {
    const { label, ...remProps } = props
    return (
        <div className='formComponent'>
            <label className='labelField' htmlFor={remProps.name}>{label}</label>
            <input className='inputField' {...remProps} required />
        </div>
    )
}