'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let MenuItem = require('material-ui/lib/menus/menu-item');

let TemplateLeftNav = React.createClass({
  render() {
    return require('./LeftNav.jade')({
      props: this.props,
      state: this.state,
      MenuItem: MenuItem
    });
  }
});

module.exports = TemplateLeftNav;
