'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let styles = require('./styles/main.scss')
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

let {AppBar, TextField} = require('material-ui/lib');

let TemplateHome = require('./templates/Home');

let ReactWrapper = React.createClass({
  getInitialState() {
  return {
      youAreUsingJade: true
    }
  },
  toggleUsingJade() {
    this.setState({
      youAreUsingJade: !this.state.youAreUsingJade
    });
  },
  render() {
    return (
      <span>
        <AppBar />
        <TemplateHome youAreUsingJade={this.state.youAreUsingJade} />
        <br />
        <button onClick={this.toggleUsingJade}>Yolo</button>
      </span>
    );
  }
})

ReactDOM.render(
  <ReactWrapper />,
  document.getElementById('jibber-render')
);
