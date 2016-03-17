'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
require('material-ui');

let TemplateHome = React.createClass({
  render() {
    return require('./Home.jade')({
      props: this.props,
      state: this.state
    });
  }
});

module.exports = TemplateHome;
