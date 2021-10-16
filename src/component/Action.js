import React from "react"

//function componet
const Action=(props)=>{
    return (
        <div className='Action'>
            <button
            onClick={props.handlePick}
            disabled={!props.hasOptions}
            >
                Pick one
            </button>
        </div>
    )
}
export default Action