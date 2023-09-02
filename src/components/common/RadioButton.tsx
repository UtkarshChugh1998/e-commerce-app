import React from 'react'

export const RadioButton = (props: any) => {
    const { name, value, label, ...remProps } = props
    return (
        <div>
            <input type='radio' name={name} value={value} {...remProps} />
            {label}
        </div>
    )
}