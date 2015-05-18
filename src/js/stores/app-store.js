var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var AppStore = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _catalog = [
  {id:1, title: 'Widget #1', cost: 1}
  {id:2, title: 'Widget #2', cost: 2}
  {id:3, title: 'Widget #3', cost: 3}
  ];

var _cartItems = [];

function _removeItem(index){
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index){
  _cartItems[index].qty++;
}

function _decreaseItem(index){
  if(_cartItems[index].qty>1){
    _cartItems[index].qty--;
  }
  else {
    _removeItem(index);
  }
}

function _addItem(item){
  if(!item.inCart){
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  }
  else {
    _cartItems.forEach(function(cartItem, i){
      if(cartItem.id===item.id){
        _increaseItem(i);
      }
    });
  }
}

AppStore.emitChange = function () {
  this.emit(CHANGE_EVENT);
};

AppStore.addChangeListener = function (callback) {
  this.on(CHANGE_EVENT, callback);
};

AppStore.removeChangeListener = function (callback) {
  this.removeListener(CHANGE_EVENT, callback);
};

AppStore.getCart = function () {
  return _cartItems;
};

AppStore.getCatalog = function () {
  return _catalog;
};

AppStore.dispatcherIndex = function () {
  AppDispatcher.register(function (payload) {
    var action = payload.action; // this is our action from handleAction
    switch (action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;
      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.index);
        break;
      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;
      case AppConstants.DECREASE_ITEM:
        _decreaseItem(payload.action.index);
    }
    AppStore.emitChange();

    return true;
  });
};

module.exports = AppStore;
