import { useEffect } from 'react'
import { urls } from './urlConfig'

export const useAddressList = (setData: any, isLoading: any) => {
    useEffect(() => {
        fetch(urls.GET_USER_INFO, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((resp) => {
            isLoading.current = false
            setData(resp)
        }).catch((error) => {
            isLoading.current = false
            console.log('Error', error)
        })
    }, [])

}