'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let ReactHeight = require('react-height');
let {
  Card,
  CardHeader,
  CardText,
  CardActions
} = require('material-ui/lib');


let JibberHeightRenderer = React.createClass({

  render() {
    return (
      <div>{
          this.props.items.map((obj) => {
            return (
              <ReactHeight key={obj.item[".key"]} hidden={true} onHeightReady={(height) => {obj.cb(height)}}>
                {this.props.rendering(obj.item)}
              </ReactHeight>
            )
          })
        }
      </div>
    );
  }
});

module.exports = JibberHeightRenderer;
