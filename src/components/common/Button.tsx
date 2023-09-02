import React from 'react'
import './button-style.css'
export const Button = (props: any) => {
    const { variant, onClick, ...remProps } = props
    const disabled = remProps.disabled
    return (<button className={`buttonRoot ${variant} ${disabled ? `disabled` : ``}`} {...remProps} onClick={onClick}> {props.children}</button >)
}