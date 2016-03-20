'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let {
  Card,
  CardHeader,
  CardText,
  CardActions,
  IconButton,
  FontIcon
} = require('material-ui/lib');

let Jibber = React.createClass({
  render() {
    return require('./Jibber.jade')({
      props: this.props,
      state: this.state,
      Card: Card,
      CardHeader: CardHeader,
      CardText: CardText,
      CardActions: CardActions,
      IconButton: IconButton,
      FontIcon: FontIcon
    });
  }
});

module.exports = Jibber;
