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
  var option = e.target.elements.option.value;

  if (option) {
    app.options.push(option); //將輸入的option加入options array內

    console.log('push!');
    e.target.elements.option.value = ''; //輸入後input區又變成空白(自動清除的概念)

    render();
  } else {
    console.log('error');
  }
};

var onRemoveAll = function onRemoveAll() {
  app.options = [];
  render();
};

var appRoot = document.getElementById('app');

var render = function render() {
  var template =
  /*#__PURE__*/
  //use{}to introduce the content, that we can reuse the template
  //JSX expressions must have one parent element，所以使用<div>包裹其他標籤
  React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, app.title), app.subtitle && /*#__PURE__*/React.createElement("h3", null, app.subtitle), /*#__PURE__*/React.createElement("p", null, app.options.length > 0 ? 'Here are your options:' : 'No options'), /*#__PURE__*/React.createElement("p", null, app.options.length), /*#__PURE__*/React.createElement("button", {
    type: "text",
    name: "removeAll",
    onClick: onRemoveAll
  }, "Remove All"), /*#__PURE__*/React.createElement("form", {
    onSubmit: onFormSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "option"
  }), /*#__PURE__*/React.createElement("button", null, "Add Option")));
  ReactDOM.render(template, appRoot);
};

render();
