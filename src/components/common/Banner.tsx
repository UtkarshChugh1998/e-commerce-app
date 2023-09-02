import React, { useState } from 'react'
import './banner-style.css'

export type BannerProps = {
    isOpen: boolean,
    setOpen: (val: boolean) => void
}
export const Banner = (props: BannerProps) => {
    const { isOpen, setOpen } = props
    const handleClick = () => {
        setOpen(false)
    }
    return (
        <>
            {
                isOpen && (<div className='alert'>
                    <span className='closebtn' onClick={handleClick}>&times;</span>
                    This is an alert box.
                </div>)
            }
        </>
    )
}