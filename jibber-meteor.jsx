injectTapEventPlugin();

if (Meteor.isClient) {
  Meteor.startup(function() {
    React.render(<Header />, document.getElementById("render-header"));
    React.render(<MessageForm />, document.getElementById("render-form"));
  });
}
