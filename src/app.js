//class component
class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this)
        this.handlePick=this.handlePick.bind(this)
        this.handleAddOption=this.handleAddOption.bind(this)
        this.state={
            options:[]
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

class Header extends React.Component {
    render(){
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h3>{this.props.subtitle}</h3>
            </div>
        )
    }
}
            
class Action extends React.Component {
    render(){
        return (
            <div>
                <button 
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                >
                    Ask for the answer
                </button>
            </div>
        )
    }
}

class Options extends React.Component {
    render(){
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {
                    this.props.options.map((option)=><Option key={option} optionText={option}/>)
                }
            </div>
        )
    }
}

class Option extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.optionText}</p> 
            </div>
        )
    }
}

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
                    <input type='text' name='option'></input>
                    <button>Add option</button>
                </form>
                {this.state.error && <p id='error'>{this.state.error}</p> }
            </div>
        )
    }
}

ReactDOM.render( <IndecisionApp />, document.getElementById('app'));