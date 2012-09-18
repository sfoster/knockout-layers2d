define(['knockout'], function(ko){
  function getValue(value) {
    if('function' === typeof value){
      value = ko.utils.unwrapObservable(value); 
    }
    return value;
  }
  ko.bindingHandlers['layers2d'] = {
      'update': function (element, valueAccessor) {
        var layers = getValue(valueAccessor()); 
        // FIXME: we don't want to call getContext every time, 
        // but the viewModel value might be elsewhere, so storing it on there is not right
        var ctx = layers._2dcontext || (layers._2dcontext = element.getContext('2d'));
        layers.forEach(function(layer){
          var instructions = getValue(layer); 
          instructions.forEach(function(instruct){
            if(instruct.assign) {
              ctx[instruct.assign] = instruct.value;
            } else if(instruct.call) {
              ctx[instruct.call].apply(ctx, instruct.value instanceof Array ? instruct.value : [instruct.value]);
            }
          })
        });
      }
  };
});