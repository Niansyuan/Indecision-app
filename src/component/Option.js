import React from "react"

//function component
const Option=(props)=>{
    return (
        <div className='Option'>
            <span>{props.optionText}</span>
            <button
                onClick={(e)=>{
                    props.handleDeleteSingleOption(props.optionText)
                }}
            >
                Remove
            </button>
        </div>
    )
}

export default Option;