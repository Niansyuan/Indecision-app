import React from "react"

//class component
export default class AddOption extends React.Component{
    constructor(props){
        super(props)
        this.handleAddOption=this.handleAddOption.bind(this)
        this.state={
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault()
        
        const option=e.target.elements.option.value.trim()
        const error=this.props.handleAddOption(option)
        e.target.elements.option.value=''
        
        this.setState(()=>({error}))
    }

    render(){
        return (
            <div>
                {this.state.error && <p className='addOption-error' id='error'>{this.state.error}</p> }
                <form className='addOption' onSubmit={this.handleAddOption}>
                    <input className='addOption__input' type='text' name='option' autoComplete='off'></input>
                    <button className='button'>Add option</button>
                </form>
            </div>
        )
    }
}