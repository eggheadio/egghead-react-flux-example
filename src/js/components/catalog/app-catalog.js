var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AddToCart = require('./app-addtocart.js')
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var CatalogItem = require('../catalog/app-catalogitem');


function getCatalog(){
  return {items: AppStore.getCatalog()}
}

var Catalog = React.createClass({
  mixins:[StoreWatchMixin(getCatalog)],
  render:function(){
    var items = this.state.items.map(function(item){
      return <CatalogItem key={item.id} item={item} />

    })
    return (
      <div className="row">
        {items}
      </div>
    )
  }
});

module.exports = Catalog
