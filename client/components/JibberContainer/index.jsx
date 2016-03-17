'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let {
  Card,
  CardHeader,
  CardText,
  CardActions
} = require('material-ui/lib');


let JibberContainer = React.createClass({
  render() {
    return require('./JibberContainer.jade')({
      props: this.props,
      state: this.state,
      Card: Card,
      CardHeader: CardHeader,
      CardHeader: CardText,
      CardHeader: CardActions
    });
  }
});

module.exports = JibberContainer;
