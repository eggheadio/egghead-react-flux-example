var React = require('react');
var Header = require('./header/app-header.js');

var Template = React.createClass({
  render:function(){
    return (
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    );
  }
});

module.exports = Template;
