import React from "react"

//function componet
const Action=(props)=>(
    <div>
        <button
        className='big-button'
        onClick={props.handlePick}
        disabled={!props.hasOptions}
        >
            Pick one
        </button>
    </div>
)
export default Action