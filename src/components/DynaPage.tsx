import React, { useEffect, useState } from 'react'
import { PageConfig } from '../config/configuration'
import { ButtonGroup } from './ButtonGroup'
import { PageTitle } from './PageTitle'
import './styles.css'

interface StepInfo extends PageConfig {
    validationStatus: boolean
}
export const DynaPage = (props: any) => {
    const { initialStep, pages } = props
    // Stores current page config.
    const persistedStep = JSON.parse(localStorage.getItem('currentStep') || 'null')
    const [validationStatus, setValidationStatus] = useState<boolean>(persistedStep?.validationStatus)
    const [currentStep, setStep] = useState<StepInfo>(persistedStep ? persistedStep : {
        ...pages[initialStep],
        validationStatus
    })



    const goToNext = () => {
        const nextPageIdentifier = currentStep.next
        // If no page config with given identifier exists, then we return the default page config.
        const nextPageConfig = pages[nextPageIdentifier || ''] || pages['default']
        setStep({
            ...nextPageConfig,
            validationStatus: validationStatus
        })
    }

    const goToPrev = () => {
        const prevPageIdentifier = currentStep.previous
        const prevPageConfig = pages[prevPageIdentifier || ''] || pages['default']
        setStep({
            ...prevPageConfig,
            validationStatus: validationStatus
        })
    }

    const goToPage = (pageName: string) => {
        const newPage = pages[pageName]
        setStep({
            ...newPage,
            validationStatus: validationStatus
        })
    }

    // Now, we need a state to store the consolidated state of 3 pages.
    const persistedState = JSON.parse(localStorage.getItem('formPayload') || 'null')
    const [formPayload, setPayload] = useState(persistedState || {} as any)

    const setFormPayload = (payload: any) => {
        const mergedPayload = Object.assign({}, formPayload, payload)
        setPayload(mergedPayload)
    }
    const clearPayloadAndLocalStorage = () => {
        // Defining clear method here, and not in ProductSummary page, to avoid race conditions.
        localStorage.removeItem('formPayload')
        setPayload({})
    }

    useEffect(() => {
        // Persisting in Local storage before refresh.
        localStorage.setItem('formPayload', JSON.stringify(formPayload))
        localStorage.setItem('currentStep', JSON.stringify(currentStep))
    }, [formPayload, currentStep])
    return (
        <div className='parentContainer'>
            <PageTitle currentStep={currentStep} />
            <div className='content'>
                {React.Children.map(props.children, (child => {
                    if (!child || child.props.name !== currentStep.identifier) {
                        return null
                    }
                    return React.cloneElement(child, { setFormPayload, formPayload, setValidationStatus, goToPage, clearPayloadAndLocalStorage })
                }))}
            </div>
            <ButtonGroup formPayload={formPayload} setFormPayload={setFormPayload} next={goToNext} prev={goToPrev} goTo={goToPage} currentStep={currentStep} validationStatus={validationStatus} />
        </div>
    )
}