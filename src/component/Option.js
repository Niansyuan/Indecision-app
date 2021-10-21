import React from "react"

//function component
const Option=(props)=>(
    <div className='option'>
        <p className='option__text'>{props.count}.{props.optionText}</p>
        <button
            className='button__link'
            onClick={(e)=>{
                props.handleDeleteSingleOption(props.optionText)
            }}
        >
            Remove
        </button>
    </div>
)

export default Option;