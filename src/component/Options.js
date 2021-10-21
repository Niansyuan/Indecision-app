import React from 'react'
import Option from './Option'
//function component
const Options=(props)=>(
    <div>
        <div className='widget-header'>
            <h3>Your options</h3>
            <button
                className='button__link'
                onClick={props.handleDeleteOptions}
            >
                Remove All
            </button>
        </div>
        
        {
            props.options.length === 0 && <p className='widget__message'>Please add some option to get started !</p>
        }
        {
            props.options.map((option,Index)=>(
                <Option 
                    count={Index+1}
                    key={option} 
                    optionText={option}
                    handleDeleteSingleOption={props.handleDeleteSingleOption}
                />
            ))
        }
    </div>
)

export default Options