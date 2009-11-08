(function($){

  var MoveMite = {

    data: {
      move_on_tick: false,
      duration: 3000,
      duration_threshold: 3000,
      distance: 100,
      distance_threshold: 20
    },

    move_css: function(mite) {
      mite.dom.css(MoveMite.next_position(mite))
    },

    move_animation: function(mite) {
      mite.dom.animate(MoveMite.next_position(mite),
                       MoveMite.duration(mite),
                       function(){ MoveMite.move_animation(mite) })
    },

    next_position: function(mite) {
      var data = mite.data[MoveMite]
      var x = mite.dom.position().left
      var y = mite.dom.position().top
      var x_max = x + (data.distance + (data.distance_threshold / 2))
      var x_min = x - (data.distance - (data.distance_threshold / 2))
      var y_max = y + (data.distance + (data.distance_threshold / 2))
      var y_min = y - (data.distance - (data.distance_threshold / 2))
      var next_x = Math.floor(x_min + (Math.random() * (x_max - x_min)))
      var next_y = Math.floor(y_min + (Math.random() * (y_max - y_min)))
      if (next_x > mite.element.width()) next_x = mite.element.width()
      if (next_x < 0) next_x = 0
      if (next_y > mite.element.height()) next_y = mite.element.height()
      if (next_y < 0) next_y = 0
      return {left: next_x + 'px', top: next_y + 'px'}
    },

    duration: function(mite) {
      var data = mite.data[MoveMite]
      var max = (data.duration + (data.duration_threshold / 2))
      var min = (data.duration - (data.duration_threshold / 2))
      var duration = Math.floor(min + (Math.random() * (max - min)))
      return duration
    },

    onBehaviorAdded: function(mite){
    },

    onTick: function(mite, evt){
      var data = mite.data[MoveMite]
      if(data.move_on_tick) MoveMite.move_css(mite)
    },

    onBringToLife: function(mite) {
      var data = mite.data[MoveMite]
      if(data.move_on_tick) {
        MoveMite.move_css(mite)
        return
      } else {
        MoveMite.move_animation(mite)
      }
    }

  }

  $.Mite.behaviors.MoveBehavior = MoveMite

})(jQuery)
