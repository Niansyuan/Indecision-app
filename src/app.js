//JSX
const app={
    title:'Indecision App',
    subtitle:'Pick whatever it comes',
    options:[]
}

const onFormSubmit=(e)=>{ //e為onSubmit事件
    e.preventDefault();
    const option=e.target.elements.option.value=''; //輸入後input區又變成空白(自動清除的概念)
    if(option){
        app.options.push(option) //將輸入的option加入options array內
        e.target.elements.option.value='';//輸入後input區又變成空白(自動清除的概念)
    }
}


const template=(
    //use{}to introduce the content, that we can reuse the template
    //JSX expressions must have one parent element，所以使用<div>包裹其他標籤
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <h3>{app.subtitle}</h3>}
        {app.options.length>0 ? <p>Here are your options:{app.options.length}</p>:<p>No options</p>}
        <form onSubmit={onFormSubmit}>
            <input type='text' name='option' placeholder='option...'></input>
            <button>Add Option</button>
        </form>
    </div>
);

const appRoot=document.getElementById('app');

ReactDOM.render(template, appRoot)

