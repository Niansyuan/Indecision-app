"use strict";

//JSX
var app = {
  title: 'Indecision App',
  subtitle: 'Pick whatever it comes',
  options: []
};

var onFormSubmit = function onFormSubmit(e) {
  //e為onSubmit事件
  e.preventDefault();
  var option = e.target.elements.option.value = ''; //輸入後input區又變成空白(自動清除的概念)

  if (option) {
    app.options.push(option); //將輸入的option加入options array內

    e.target.elements.option.value = ''; //輸入後input區又變成空白(自動清除的概念)
  }
};

var template =
/*#__PURE__*/
//use{}to introduce the content, that we can reuse the template
//JSX expressions must have one parent element，所以使用<div>包裹其他標籤
React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, app.title), app.subtitle && /*#__PURE__*/React.createElement("h3", null, app.subtitle), app.options.length > 0 ? /*#__PURE__*/React.createElement("p", null, "Here are your options:", app.options.length) : /*#__PURE__*/React.createElement("p", null, "No options"), /*#__PURE__*/React.createElement("form", {
  onSubmit: onFormSubmit
}, /*#__PURE__*/React.createElement("input", {
  type: "text",
  name: "option",
  placeholder: "option..."
}), /*#__PURE__*/React.createElement("button", null, "Add Option")));
var appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);
