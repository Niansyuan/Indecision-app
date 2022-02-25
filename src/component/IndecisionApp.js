import React from 'react'
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal'

//class component
class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this)
        this.handleAddChance = this.handleAddChance.bind(this)
        this.handleMinusChance = this.handleMinusChance.bind(this)
        // this.handleMinusChance = this.handleMinusChance.bind(this)
        this.state = {
            options: [],
            optionsAfterChanceUp: [],
            selectedOption: undefined
        }
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const json2 = localStorage.getItem('optionsAfterChanceUp')
            const options = JSON.parse(json)
            const optionsAfterChanceUp = JSON.parse(json2)
            if (options) {
                this.setState(() => ({ options }))
            }
            if (optionsAfterChanceUp) {
                this.setState(() => ({ optionsAfterChanceUp }))
            }
        } catch (e) {
        }
    }

    componentDidUpdate(prevProps, prevState) { //prevProps要留著，不然會讀不到this.state.options
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)  //setItem(key,value)
        }
        //當handleAddChance與handleMinusChance作用時，chance會改變(等於state中的props，所以用prevProps參數)，會啟動componenetDidUpdate，讓optionsAfterChanceUp結果儲存在localStorage中
        if (prevProps.options !== this.state.options) {
            const json = JSON.stringify(this.state.options)
            const json2 = JSON.stringify(this.state.optionsAfterChanceUp)
            localStorage.setItem('options', json)
            localStorage.setItem('optionsAfterChanceUp', json2)
        }
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    handleDeleteOptions() {
        // 進階語法:用大括號將內容括起來，返回一個object的表示法
        this.setState(() => ({
            options: [],
            optionsAfterChanceUp: []
        }))
    }
    handleDeleteSingleOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option[0]),
            optionsAfterChanceUp: prevState.optionsAfterChanceUp.filter((option) => optionToRemove !== option)
        }))
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.optionsAfterChanceUp.length)
        this.setState(() => ({
            selectedOption: this.state.optionsAfterChanceUp[randomNum]
        }))
    }

    handleAddOption(option) {
        if (!option) {
            return 'Enter vaild value'
        } else if (this.state.options.map((option) => option[0]).indexOf(option) > -1) {
            return 'This option is already exist'
        }
        this.setState((prevState, chance) => {
            return {
                options: prevState.options.concat([[option, chance = 1]]),
                //讓AddOption動作把option同時也加入optionsAfterChanceUp中
                //透透過map((option)=>option[0]))，讓我們可以只加入option[0]，而非[option,chance]
                optionsAfterChanceUp: [...prevState.options.map((option) => option[0]), option]
            }
        })
    }

    handleAddChance(optionToChanceUp) {
        this.setState((prevState) => {
            //透過for of迴圈檢查options中的option
            for (let option of prevState.options) {
                // 1.如果這個option中含有我們目標增加的option
                if (option.includes(optionToChanceUp)) {
                    // 2.就對這個option的chance+1
                    option[1] += 1
                    // 3.把這個option push到所設置的另一個array中
                    this.state.optionsAfterChanceUp.push(optionToChanceUp)
                    // 4.回傳新增的option chance
                    return option[1]
                }
                // console.log(option[1]) //會印出chance
                // console.log(prevState.options) //會返回已新增後的options ex.[['apple',1],['banana',3]]
            };

        })
    };

    handleMinusChance(optionToChanceDown) {
        this.setState((prevState) => {
            //原理跟handleAddChance一樣
            for (let option of prevState.options) {
                //但為了不讓chance小於1，所以設置條件chance>1
                if (option[1] > 1) {
                    if (option.includes(optionToChanceDown)) {
                        this.state.optionsAfterChanceUp.splice(this.state.optionsAfterChanceUp.indexOf(optionToChanceDown), 1)
                        console.log(this.state.optionsAfterChanceUp)
                        option[1] -= 1
                        return option[1]
                    }
                }
            };
        })

    };

    handleCloseModal = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }

    render() {
        const title = 'Indecision'
        const subtitle = 'Let computer make decision for you'
        return (
            <div className='wrapper'>
                <Header
                    title={title} subtitle={subtitle}
                />

                <div className='container'>
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className='widget'>
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteSingleOption={this.handleDeleteSingleOption}
                            handleAddChance={this.handleAddChance}
                            handleMinusChance={this.handleMinusChance}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>

                </div>

                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleCloseModal={this.handleCloseModal}
                />
            </div>
        )
    }
}

export default IndecisionApp