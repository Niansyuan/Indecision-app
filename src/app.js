//class component
class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this)
        this.handlePick=this.handlePick.bind(this)
        this.handleAddOption=this.handleAddOption.bind(this)
        this.state={
            options:props.options //來自下方的IndecisionApp.defaultProps
        }
    }
    handleDeleteOptions(){
        this.setState(()=>{
            return{
                options:[]
            }
        })
    }

    handlePick(){
        this.setState(()=>{
            if(this.state.options.length>0){
                const randomNum=Math.floor(Math.random()*this.state.options.length)
                console.log(randomNum)
                alert(this.state.options[randomNum])
            }else{
                console.log('Give me some options')
            }
        })
    }

    handleAddOption(option){
        if(!option){
            return 'Enter vaild value'
        }else if(this.state.options.indexOf(option) > -1){
            return 'This option is already exist'
        }

        this.setState((prevState)=>{
            return {
                options:prevState.options.concat([option])
            }
        })
    }

    render() {
        const title='Indecision'
        const subtitle='Let computer make decision for you'
        return (
            <div>
                <Header 
                title={title} subtitle={subtitle}
                />
                <Action 
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                />
                <AddOption 
                handleAddOption={this.handleAddOption} 
                />
            </div>
        )
    }
}
// Default props value
IndecisionApp.defaultProps={
    options:[]
}

//function component 
//(當內容沒有太複雜時可以選用function component，會比class component快速)
const Header=(props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            <h3>{props.subtitle}</h3>
        </div>
    )
}

//function componet
const Action=(props)=>{
    return (
        <div>
            <button
            onClick={props.handlePick}
            disabled={!props.hasOptions}
            >
                Pick one
            </button>
        </div>
    )
}

//function component
const Options=(props)=>{
    return (
        <div>
            <button
            onClick={props.handleDeleteOptions}
            >
                Remove All
            </button>
            {
                props.options.map((option)=><Option key={option} optionText={option}/>)
            }
        </div>
    )
}

//function component
const Option=(props)=>{
    return (
        <div>
            <p>{props.optionText}</p>
        </div>
    )
}

//class component
class AddOption extends React.Component{
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
        
        this.setState(()=>{
            return{error}
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name='option' autocomplete='off'></input>
                    <button>Add option</button>
                </form>
                {this.state.error && <p id='error'>{this.state.error}</p> }
            </div>
        )
    }
}

ReactDOM.render( <IndecisionApp />, document.getElementById('app'));