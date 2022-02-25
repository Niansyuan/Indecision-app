import React from "react"

//function component
const Option = (props) => (
    <div className='option'>
        <p className='option__text'>{props.count}.{props.optionText}</p>
        <div className='option-chance'>
            <button
                className='button__link chance'
                onClick={() => {
                    props.handleMinusChance(props.optionText)
                }}>-</button>
            <p className='option__text--chance'>{props.chance}</p>
            <button
                className='button__link chance'
                onClick={() => {
                    props.handleAddChance(props.optionText)
                }}
            >+</button>
        </div>
        <button
            className='button__link'
            onClick={() => {
                props.handleDeleteSingleOption(props.optionText)
            }}
        >Remove</button>
    </div>
)

export default Option;