'use strict'

// main.js
let React = require('react');
let ReactDOM = require('react-dom');

let TemplateHome = React.createClass({
  render() {
    return require('jade-react!./templates/Home.jade')({
      lets: this.props
    });
  }
});

ReactDOM.render(<TemplateHome youAreUsingJade={true} />,
  document.getElementById('example')
);
