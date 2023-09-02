import React, { useEffect, useRef, useState } from 'react'
import { useAddressList } from '../../../hooks/useAddressList'
import { Address } from './Address'
import { AddAdress } from './AddAddress'
import { Loader } from '../../common/Loader'
import { AddressForm } from './AddressForm'
import { AddressInfo, UserInfo } from '../../../config/types'
import { addressExists } from '../../../config/configuration'
import { Button } from '../../common/Button'

export const AddressPage = (props: any) => {
    const isLoading = useRef<boolean>(true)
    const storedData = JSON.parse(localStorage.getItem('addresses') || '[]')
    const { setFormPayload, setValidationStatus, formPayload, isBuyPage, goToPage } = props
    const [userData, setUserData] = useState<UserInfo>()
    const [addressData, setAddressData] = useState<AddressInfo[]>(storedData || [])
    const [isFormVis, setFormVis] = useState<boolean>(false)
    const [currAddressId, setCurrAddressId] = useState<number>(formPayload?.addressData?.id || 0)
    useAddressList(setUserData, isLoading)
    useEffect(() => {
        if (!!userData) {
            setAddressData((prev: AddressInfo[]) => {
                if (!addressExists(prev, userData.address)) {
                    const len = prev.length
                    return [...prev, {
                        ...userData.address,
                        id: len
                    }]
                }
                return prev
            })
        }
    }, [userData])

    const handleNewAddress = (address: AddressInfo) => {
        if (!addressExists(addressData, address)) {
            const len = addressData.length
            setAddressData((prev) => [...prev, {
                ...address,
                id: len
            }])
        }
    }
    useEffect(() => {
        localStorage.setItem('addresses', JSON.stringify(addressData))
        if (!formPayload.addressData) {
            setFormPayload({
                addressData: addressData[0]
            })
        }
        if (!!addressData.length) {
            setValidationStatus(true)
        }
        else {
            setValidationStatus(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressData])

    useEffect(() => {
        // If user clicks back, validation needs to be set to true.
        return () => setValidationStatus(true)
    }, [])
    const handleAddressSelection = (address: AddressInfo) => {
        setCurrAddressId(address.id)
        setFormPayload({
            addressData: address
        })
    }
    const displayForm = (value: boolean) => {
        setFormVis(value)
        setValidationStatus(false)
    }
    return (
        <div className='addressPageContainer'>
            {isLoading.current ? <Loader /> : (
                addressData?.map((address: AddressInfo, index: number) => (
                    <Address address={address} selected={address.id === currAddressId} addressKey={index} setAddress={handleAddressSelection} key={index} />
                ))
            )
            }
            {!isBuyPage ? (
                isFormVis ? (
                    <AddressForm setValidation={setValidationStatus} setAddressData={handleNewAddress} showForm={(value: boolean) => setFormVis(value)} />
                ) :
                    <AddAdress showForm={(value: boolean) => displayForm(value)} />)
                : (
                    <Button variant='secondary' onClick={() => goToPage('address')}>Edit Address</Button>
                )}
        </div>
    )
}