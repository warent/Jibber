'use strict'

// main.js
let React = require('react');
let ReactDOM = require('react-dom');
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
        <TemplateHome youAreUsingJade={this.state.youAreUsingJade} />
        <br />
        <button onClick={this.toggleUsingJade}>Yolo</button>
      </span>
    );
  }
})

ReactDOM.render(
  <ReactWrapper />,
  document.getElementById('example')
);
