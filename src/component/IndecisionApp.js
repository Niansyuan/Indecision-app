import React from 'react'
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'

//class component
class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this)
        this.handlePick=this.handlePick.bind(this)
        this.handleAddOption=this.handleAddOption.bind(this)
        this.handleDeleteSingleOption=this.handleDeleteSingleOption.bind(this)
        this.state={
            options:[]
        }
    }

    componentDidMount(){ 
        try{
            const json=localStorage.getItem('options')
            const options=JSON.parse(json)
            if(options){
                this.setState(()=>({options}))
            }
        }catch(e){

        }
    }

    componentDidUpdate(prevProps,prevState){ //prevProps要留著，不然會讀不到this.state.options
        if(prevState.options.length !== this.state.options.length){
            const json=JSON.stringify(this.state.options)
            localStorage.setItem('options',json)  //setItem(key,value)
        }
    }

    componentWillUnmount(){
        console.log('unmount')
    }

    handleDeleteOptions(){
        // 進階語法:用大括號將內容括起來，返回一個object的表示法
        this.setState(()=>({options:[]}))
    }
    handleDeleteSingleOption(optionToRemove){
        this.setState((prevState)=>({
            options:prevState.options.filter((option)=> optionToRemove !== option)
        }))
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
            <div className='wrapper'>
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
                    handleDeleteSingleOption={this.handleDeleteSingleOption}
                />
                <AddOption 
                handleAddOption={this.handleAddOption} 
                />
            </div>
        )
    }
}

export default IndecisionApp