import React from "react"

//function component 
const Header=(props)=>{
    return (
        <div className='Header'>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
        </div>
    )
}
export default Header;