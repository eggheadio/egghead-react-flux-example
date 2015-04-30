/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');

var APP = 
  React.createClass({
    handleClick:function(){
      AppActions.addItem('this is the item');
    },
    render: function(){
      return <h1 onClick={this.handleClick}>MY FLUX APP</h1>
    }
  });
module.exports = APP;