import React, { useEffect, useState } from 'react'

export const SearchFilter = (props: any) => {
    const { setFilterValue } = props
    const [localFilterValue, setLocalFilter] = useState<any>('')
    const handleFilterValue = (e: any) => {
        setLocalFilter(e.target.value)
    }
    useEffect(() => {
        const intervalId = setTimeout(() => {
            setFilterValue(localFilterValue)
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [localFilterValue, setFilterValue])

    return (
        <div className='filterBox'>
            <div className='filterTitle'>Filter By Product Name/ Category</div>
            <div>
            <input className='filterInput' type='text' placeholder='Start Typing to search' value={localFilterValue} onChange={handleFilterValue} />
            </div>
        </div>
    )
}