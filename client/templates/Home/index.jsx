'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let TemplateHome = React.createClass({
  render() {
    return require('jade-react!./Home.jade')({
      props: this.props,
      state: this.state
    });
  }
});

module.exports = TemplateHome;
