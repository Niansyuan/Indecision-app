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
            <div className='AddOption'>
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name='option' autoComplete='off'></input>
                    <button>Add option</button>
                </form>
                {this.state.error && <p id='error'>{this.state.error}</p> }
            </div>
        )
    }
}