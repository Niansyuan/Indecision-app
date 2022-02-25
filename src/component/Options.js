import React from 'react'
import Option from './Option'
//function component
const Options = (props) => (
    <div>
        <div className='widget-header'>
            <h3>Your options</h3>
            <h3 className='widget-chance'>Chance</h3>
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
            props.options.map((option, Index) => (
                <Option
                    count={Index + 1}
                    key={option[0]}
                    optionText={option[0]}
                    handleDeleteSingleOption={props.handleDeleteSingleOption}
                    handleAddChance={props.handleAddChance}
                    handleMinusChance={props.handleMinusChance}
                    chance={option[1]}
                />
            ))
        }
    </div>
)

export default Options