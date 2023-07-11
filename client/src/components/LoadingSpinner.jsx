import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = ({withoutText}) => {
    return(
        <>
            <div className='spinner-container'>
                <div className="spinner"></div>
                {!withoutText && <h2 className='spinner-text'>cargando</h2>}
            </div>
        </>
    )
}

export default LoadingSpinner