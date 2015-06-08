var React = require('react');
var CartSummary = require('./app-cartsummary.js');

var Header = React.createClass({
  render:function(){
    return (
        <div className="row">
          <div className="col-sm-6"><h1>Lets Shop</h1></div>
          <div className="col-sm-2 col-sm-push-3">
            <br />
            <CartSummary />
          </div>
       </div>
    );
  }
});

module.exports = Header;
