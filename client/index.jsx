'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let styles = require('./styles/main.scss');
let getMuiTheme = require('material-ui/lib/styles/getMuiTheme');
let lightTheme = require('material-ui/lib/styles/baseThemes/lightBaseTheme');

const FIREBASE_APP = "intense-torch-7142";

let {
  AppBar,
  TextField,
  FlatButton,
  IconButton,
  LeftNav,
  Avatar
} = require('material-ui/lib');

let NavigationMenu = require('material-ui/lib/svg-icons/navigation/menu');

let Jibber = require('./components/Jibber');
let JibberContainer = require('./components/JibberContainer');
let UserPopover = require('./components/UserPopover');
let TemplateLeftNav = require('./components/LeftNav');

let ref = new Firebase("https://" + FIREBASE_APP + ".firebaseio.com");

let ReactWrapper = React.createClass({

  componentDidMount() {
    ref.onAuth(this.setGoogleCredentials);
  },

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
      navOpen: false,
      googleCredentials: null,
      showUserPopover: false
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

  setGoogleCredentials(data) {
    this.setState({
      googleCredentials: data
    });
  },
  signInWithGoogle() {
    ref.authWithOAuthPopup("google", (error, authData) => {
      console.log(authData);
      this.setGoogleCredentials(authData);
      this.toggleNav();
    });
  },
  signOut() {
    ref.unauth();
    this.setState({
      googleCredentials: null
    });
  },

  clickAvatar(event) {
    this.setState({
      userPopoverAnchorEl: event.currentTarget,
      showUserPopover: !this.state.showUserPopover
    });
  },

  render() {
    return (
      <span>
        <AppBar
          title="Jibber"
          iconElementLeft={<span></span>}
          iconElementRight={!this.state.googleCredentials
          ? <FlatButton label="Sign In" onClick={this.signInWithGoogle} />
          : <span>
              <IconButton onClick={this.clickAvatar}>
                <Avatar className="appbar-avatar"
                        size={50}
                        src={this.state.googleCredentials.google.profileImageURL}
                        />
              </IconButton>
              <UserPopover open={this.state.showUserPopover} anchor={this.state.userPopoverAnchorEl} requestClose={this.clickAvatar}>
                <FlatButton label="Sign Out" onClick={this.signOut} />
              </UserPopover>
            </span>
          }
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
