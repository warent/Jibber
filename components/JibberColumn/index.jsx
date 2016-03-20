'use strict'

let React = require('react');
let ReactDOM = require('react-dom');
let rvStyles = require('react-virtualized/styles.css');

let { VirtualScroll, AutoSizer } = require('react-virtualized');

let {
  Card,
  CardHeader,
  CardText,
  CardActions
} = require('material-ui/lib');

let JibberColumn = React.createClass({

  getInitialState() {
    return {
      updatingSwitch: false
    };
  },

  componentDidUpdate() {
    if (this.state.updatingSwitch) {
      this.setState({
        updatingSwitch: false
      });
      this.props.nextWriteCb();
    }
  },

  _noRowsRenderer () {
    return (
      <div className={rvStyles.noRows}>
        No rows
      </div>
    )
  },

  _getDatum (index) {
    return this.props.items[index];
  },

  // Row heights are fetched before rendering. This is a
  _getRowHeight (index) {
    return this.props.heights[index];
  },

  render() {
    /**
      * It's difficult to translate this to jade off the top of my head
      * without coming up with some wonky parameters.
      * For now just render without jade but get back to this later
      **/
    return (
      <AutoSizer disableHeight>
      {({ width }) => (
        <VirtualScroll
          ref='VirtualScroll'
          className={rvStyles.VirtualScroll}
          height={600}
          overscanRowsCount={1}
          noRowsRenderer={this._noRowsRenderer}
          rowsCount={this.props.items.length}
          rowHeight={this._getRowHeight}
          rowRenderer={this._rowRenderer}
          scrollToIndex={0}
          width={300}
        />
      )}
    </AutoSizer>
    );
  },

  _rowRenderer(index) {
    this.setState({
      updatingSwitch: true
    });
    return this.props.items[index];
  }
});

module.exports = JibberColumn;
