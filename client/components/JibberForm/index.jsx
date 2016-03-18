'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let update = require('react-addons-update');
let {
  Card,
  CardHeader,
  CardText,
  CardActions,
  TextField,
  FlatButton
} = require('material-ui/lib');


let JibberForm = React.createClass({

  getInitialState() {
    return {
      textFieldBinder: {
        value: "",
        requestChange: function(v) {
          this.setState({textFieldValue:v});
          let newValue = update(this.state, {
            textFieldBinder: {
              value: {$set:v}
            }
          });
          this.setState(newValue);
        }.bind(this)
      }
    };
  },

  submit() {
    console.log(this.state.textFieldBinder.value);
    let newValue = update(this.state, {
      textFieldBinder: {
        value: {$set:""}
      }
    });
    this.setState(newValue);
  },

  render() {
    return require('./JibberForm.jade')({
      props: this.props,
      state: this.state,
      submit: this.submit,
      Card: Card,
      CardText: CardText,
      TextField: TextField,
      FlatButton: FlatButton
    });
  }
});

module.exports = JibberForm;
