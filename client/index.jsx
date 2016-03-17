'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let styles = require('./styles/main.scss')
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

let {
  AppBar,
  TextField,
  Card,
  CardHeader,
  CardText,
  CardActions,
  FlatButton,
  IconButton,
  LeftNav
} = require('material-ui/lib');

let NavigationMenu = require('material-ui/lib/svg-icons/navigation/menu');

let TemplateHome = require('./templates/Home');
let TemplateLeftNav = require('./templates/LeftNav');

let ReactWrapper = React.createClass({
  getInitialState() {
  return {
      youAreUsingJade: true,
      navOpen: false
    }
  },
  toggleUsingJade() {
    this.setState({
      youAreUsingJade: !this.state.youAreUsingJade
    });
  },
  toggleNav() {
    this.setState({
      navOpen: !this.state.navOpen
    });
  },
  clickNavMenu() {
    this.toggleNav();
  },
  render() {
    return (
      <span>
        <LeftNav open={this.state.navOpen}>
          <TemplateLeftNav doClose={this.toggleNav} />
        </LeftNav>
        <AppBar
          title="Jibber"
          iconElementLeft={<IconButton onClick={this.clickNavMenu}><NavigationMenu /></IconButton>}
          />
        <Card>
          <CardHeader
            title="Hello World" />
          <CardText>
            <TemplateHome youAreUsingJade={this.state.youAreUsingJade} />
          </CardText>
          <CardActions>
            <FlatButton onClick={this.toggleUsingJade} label="Are you using Jade?" />
          </CardActions>
        </Card>
      </span>
    );
  }
})

ReactDOM.render(
  <ReactWrapper />,
  document.getElementById('jibber-render')
);
