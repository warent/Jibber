'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let styles = require('./styles/main.scss');
let getMuiTheme = require('material-ui/lib/styles/getMuiTheme');
let lightTheme = require('material-ui/lib/styles/baseThemes/lightBaseTheme');

let {
  AppBar,
  TextField,
  FlatButton,
  IconButton,
  LeftNav
} = require('material-ui/lib');

let NavigationMenu = require('material-ui/lib/svg-icons/navigation/menu');

let Jibber = require('./components/Jibber');
let JibberContainer = require('./components/JibberContainer');
let TemplateLeftNav = require('./components/LeftNav');

let ReactWrapper = React.createClass({

  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: getMuiTheme(lightTheme),
    };
  },

  getInitialState() {
    return {
      youAreUsingJade: true,
      navOpen: false
    };
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
        <JibberContainer className="jibber-container">
          <Jibber title="Yolo">
            Hello World!
          </Jibber>
          <Jibber title="Yolo">
            Hello World!
          </Jibber>
          <Jibber title="Yolo">
            Hello World!
          </Jibber>
          <Jibber title="Yolo">
            Hello World!
          </Jibber>
        </JibberContainer>
      </span>
    );
  }
})

ReactDOM.render(
  <ReactWrapper />,
  document.getElementById('jibber-render')
);

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
