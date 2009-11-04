(function($){

  var RainbowMite = {
    data: {
      colorwheel: ['#000', '#800', '#F00', '#F88', '#FFF', '#F88', '#F00', '#800'],
      position: 0
    },

    update_color: function(mite) {
      data = mite.data[this]
      mite.dom.css({background: data.colorwheel[data.position]})
    },

    onTick: function(mite, evt){
      var data = mite.data[RainbowMite]
      data.position = (data.position + 1) % data.colorwheel.length
      RainbowMite.update_color(mite)
    },

    onBehaviorAdded: function(mite){
    },

    onBringToLife: function(mite) {
      RainbowMite.update_color(mite)
    }
  }

  $.Mite.behaviors.RainbowBehavior = RainbowMite

})(jQuery)
