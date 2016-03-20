'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let {
  Popover
} = require('material-ui/lib');


let UserPopover = React.createClass({
  getInitialState() {
    return {
      anchorOrigin: {horizontal: 'left', vertical: 'bottom'},
      targetOrigin: {horizontal: 'left', vertical: 'top'}
    };
  },

  render() {
    return require('./UserPopover.jade')({
      props: this.props,
      state: this.state,
      Popover
    });
  }
});

module.exports = UserPopover;
