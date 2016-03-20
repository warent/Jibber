'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let styles = require('./styles/main.scss');
let getMuiTheme = require('material-ui/lib/styles/getMuiTheme');
let lightTheme = require('material-ui/lib/styles/baseThemes/lightBaseTheme');
let update = require('react-addons-update');

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
let JibberForm = require('./components/JibberForm');
let JibberColumn = require('./components/JibberColumn');
let JibberHeightRenderer = require('./components/JibberHeightRenderer');
let UserPopover = require('./components/UserPopover');
let TemplateLeftNav = require('./components/LeftNav');

let firebaseJibberRef = new Firebase("https://" + FIREBASE_APP + ".firebaseio.com/jibbers");
let writeQueue = [];
let runningWrite = false;

let ReactWrapper = React.createClass({

  mixins: [ReactFireMixin],

  componentWillMount() {
    firebaseJibberRef.on('child_added', (data) => {
      if (!writeQueue.length && !runningWrite) {
        console.log("Direct write");
        this.writeJibber(data.val());
      }
      else writeQueue.push(data.val());
    });
  },

  componentDidMount() {
    firebaseJibberRef.onAuth(this.setGoogleCredentials);
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
      showUserPopover: false,
      jibberText: "",
      jibbersList: [],
      jibbersHeights: [],
      jibbersHeightsRenderers: []
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
    firebaseJibberRef.authWithOAuthPopup("google", (error, authData) => {
      console.log(authData);
      this.setGoogleCredentials(authData);
      this.toggleNav();
    });
  },
  signOut() {
    firebaseJibberRef.unauth();
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

  submitJibberForm(submittedText) {
    firebaseJibberRef.push({
      title: "yolo",
      body: submittedText
    });
  },

  renderJibber(jibber) {
    return <Jibber key={jibber[".key"]} title={jibber["title"]}>{jibber["body"]}</Jibber>;
  },

  virtualizeHeight(jibber) {
    return new Promise((resolve, reject) => {
      let newRenderersList = update(this.state.jibbersHeightsRenderers, {$push: [{"item": jibber, "cb": resolve}]});
      this.setState({jibbersHeightsRenderers: newRenderersList});
    });
  },

  writeJibber(jibber) {
    console.log(jibber);
    runningWrite = true;
    if (!jibber && writeQueue.length > 0) jibber = writeQueue.unshift();
    this.virtualizeHeight(jibber).then((height) => {
      let newJibbersHeights = update(this.state.jibbersHeights, {$push: [height]});
      this.setState({
        jibbersHeights: newJibbersHeights
      });
      console.log(this.state.jibbersHeights);
      let newJibbersList = update(this.state.jibbersList, {$push: [this.renderJibber(jibber)]});
      this.setState({
        jibbersList: newJibbersList
      });
    }, (err) => {
      console.log("Rejected", err);
    });
  },

  render() {
    return (
      <span>
        <JibberHeightRenderer rendering={this.renderJibber} items={this.state.jibbersHeightsRenderers} />
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
        <JibberForm submit={this.submitJibberForm} bindText={this.state.jibberText} />
        <JibberContainer className="jibber-container">
          <JibberColumn nextWriteCb={this.writeJibber} items={this.state.jibbersList} heights={this.state.jibbersHeights}></JibberColumn>
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
