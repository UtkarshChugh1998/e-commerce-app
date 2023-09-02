import React from 'react'
export const PageTitle = (props: any) => {
    const { currentStep } = props
    return (
        <div className='title'>
            {currentStep.title}
        </div>
    )
}