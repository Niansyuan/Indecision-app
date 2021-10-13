'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//class component
var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteSingleOption = _this.handleDeleteSingleOption.bind(_this);
        _this.state = {
            options: []
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {}
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            //prevProps要留著，不然會讀不到this.state.options
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json); //setItem(key,value)
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('unmount');
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            // 進階語法:用大括號將內容括起來，返回一個object的表示法
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteSingleOption',
        value: function handleDeleteSingleOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var _this2 = this;

            this.setState(function () {
                if (_this2.state.options.length > 0) {
                    var randomNum = Math.floor(Math.random() * _this2.state.options.length);
                    console.log(randomNum);
                    alert(_this2.state.options[randomNum]);
                } else {
                    console.log('Give me some options');
                }
            });
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                return 'Enter vaild value';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'This option is already exist';
            }
            this.setState(function (prevState) {
                return {
                    options: prevState.options.concat([option])
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var title = 'Indecision';
            var subtitle = 'Let computer make decision for you';
            return React.createElement(
                'div',
                { className: 'wrapper' },
                React.createElement(Header, {
                    title: title, subtitle: subtitle
                }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteSingleOption: this.handleDeleteSingleOption
                }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

//function component 
//(當內容沒有太複雜時可以選用function component，會比class component快速)


var Header = function Header(props) {
    return React.createElement(
        'div',
        { className: 'Header' },
        React.createElement(
            'h1',
            null,
            props.title
        ),
        React.createElement(
            'h3',
            null,
            props.subtitle
        )
    );
};

//function componet
var Action = function Action(props) {
    return React.createElement(
        'div',
        { className: 'Action' },
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'Pick one'
        )
    );
};

//function component
var Options = function Options(props) {
    return React.createElement(
        'div',
        { className: 'Options' },
        React.createElement(
            'button',
            {
                onClick: props.handleDeleteOptions
            },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please add some option to get started !'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                optionText: option,
                handleDeleteSingleOption: props.handleDeleteSingleOption
            });
        })
    );
};

//function component
var Option = function Option(props) {
    return React.createElement(
        'div',
        { className: 'Option' },
        React.createElement(
            'span',
            null,
            props.optionText
        ),
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.handleDeleteSingleOption(props.optionText);
                }
            },
            'Remove'
        )
    );
};

//class component

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this3 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this3.handleAddOption = _this3.handleAddOption.bind(_this3);
        _this3.state = {
            error: undefined
        };
        return _this3;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();

            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);
            e.target.elements.option.value = '';

            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'AddOption' },
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option', autocomplete: 'off' }),
                    React.createElement(
                        'button',
                        null,
                        'Add option'
                    )
                ),
                this.state.error && React.createElement(
                    'p',
                    { id: 'error' },
                    this.state.error
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
