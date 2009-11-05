(function($){

  var GrowMite = {
    data: {
      expansion_rate: 5,
      initial_size: 20,
      position: 0
    },

    update_size: function(mite) {
      data = mite.data[this]
      var oh = mite.dom.height()
      var ow = mite.dom.width()
      mite.dom.css({width: ow + data.expansion_rate, height: oh + data.expansion_rate})
    },

    onTick: function(mite, evt){
      GrowMite.update_size(mite)
    },

    onBehaviorAdded: function(mite){
    },

    onBringToLife: function(mite) {
      var data = mite.data[GrowMite]
      mite.dom.css({top: 0, left: 0, width: data.initial_size, height: data.initial_size})
    }

  }

  GrowMite.onReset = GrowMite.onBringToLife

  $.Mite.behaviors.GrowBehavior = GrowMite
  $.Mite.callbacks.push('Reset')

})(jQuery)
