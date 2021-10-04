//JSX
const app={
    title:'Indecision App',
    subtitle:'Pick whatever it comes',
    options:[]
}

const onFormSubmit=(e)=>{ //e為onSubmit事件
    e.preventDefault();

    const option=e.target.elements.option.value;

    if(option){
        app.options.push(option);//將輸入的option加入options array內
        console.log('push!')
        e.target.elements.option.value='';//輸入後input區又變成空白(自動清除的概念)
        render();
    }else{
        console.log('error')
    }
}

const onRemoveAll=()=>{
    app.options=[]
    render()
}

const appRoot=document.getElementById('app');

const render=()=>{
    const template=(
        //use{}to introduce the content, that we can reuse the template
        //JSX expressions must have one parent element，所以使用<div>包裹其他標籤
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <h3>{app.subtitle}</h3>}
            <p>{app.options.length>0 ? 'Here are your options:':'No options'}</p>
            <p>{app.options.length}</p>
            <button type='text' name='removeAll' onClick={onRemoveAll}>Remove All</button>
            <form onSubmit={onFormSubmit}>
                <input type='text' name='option'></input>
                <button>Add Option</button>
            </form>
            
        </div>
    );
    ReactDOM.render(template, appRoot)
}

render();