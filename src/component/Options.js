import React from 'react'
import Option from './Option'
//function component
const Options=(props)=>{
    return (
        <div className='Options'>
            <button
                onClick={props.handleDeleteOptions}
            >
                Remove All
            </button>
            {
                props.options.length === 0 && <p>Please add some option to get started !</p>
            }
            {
                props.options.map((option)=>(
                    <Option 
                        key={option} 
                        optionText={option}
                        handleDeleteSingleOption={props.handleDeleteSingleOption}
                    />
                ))
            }
        </div>
    )
}

export default Options