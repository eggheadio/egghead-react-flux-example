var React = require('react');
var AppActions = require('../../actions/app-actions');

var DecreaseItem = React.createClass({
  handler: function(){
    AppActions.decreaseItem(this.props.index)
  },
  render:function(){
    return <button onClick={this.handler}>-</button>
  }
});

module.exports = DecreaseItem;
