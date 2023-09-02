import React from 'react'
import { InitiatePurchase } from './InitiatePurchase'
import { Button } from './common/Button'
export const ButtonGroup = (props: any) => {
    // We need the data of current step.
    const { currentStep, validationStatus, next, prev, goTo, setFormPayload, formPayload } = props
    return (
        <div className='buttonBar'>
            {
                currentStep.previous && (
                    <div className='backButton button'>
                        <Button variant='cta' onClick={() => {
                            prev()
                        }}>{currentStep.prevTitle}</Button>
                    </div>)
            }

            {currentStep.goTos && (
                <div className='button'>
                    {currentStep.goTos.map((goToPage: any, index: number) => (
                        <Button variant='secondary' key={`goto-${index}`} onClick={() => {
                            goTo(goToPage.identifier)
                        }}>{goToPage.title}</Button>
                    ))}
                </div>
            )
            }
            {
                currentStep.next && (
                    <div className='button'>
                        <Button variant='secondary' disabled={!validationStatus}
                            onClick={() => {
                                next()
                            }}>{currentStep.nextTitle}</Button>
                    </div>
                )
            }
            {
                currentStep.finishTitle && (
                    <div className='button'>
                        <InitiatePurchase validationStatus={validationStatus} setFormPayload={setFormPayload} formPayload={formPayload} goTo={goTo} />
                    </div >
                )
            }
        </div >
    )
}