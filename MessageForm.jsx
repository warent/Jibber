let {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    DatePicker,
    TextField
    } = MUI;
let { ThemeManager, LightRawTheme } = Styles;

MessageForm = React.createClass({

  childContextTypes: {
      muiTheme: React.PropTypes.object
  },

  getChildContext() {
      return {
          muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
      };
  },

  render() {
    return (
      <AppCanvas>
        <RaisedButton primary={true} label="Tap" />
      </AppCanvas>
    );
  }
})
