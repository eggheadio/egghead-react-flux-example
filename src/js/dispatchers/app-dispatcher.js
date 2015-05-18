var AppDispatcher = require('./dispatcher.js');

AppDispatcher.handleViewAction = function(action){
    this.dispatch({
      source: 'VIEW_ACTION',
      action:action
    });
  }
});

module.exports = AppDispatcher;
