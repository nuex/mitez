(function(){

  var temperaments = ['timid', 'fearless', 'drunk'];
  var speeds = ['slow', 'medium', 'fast'];
  var modes = ['chillin', 'attack', 'retreat'];

  var Mite = function(container){

    var container = $(container);

    // Give the Mite a place in the world
    this.position = {};
    this.speed = speeds[rand(speeds.length)];
    this.temperament = temperaments[rand(temperaments.length)];
    this.mode = modes[0];

    this.dom = $('<div class="mite"></div>');
    this.dom.data('mite', this);

    this.dom.bind('travel', function(e, data){
      self.travel(data.x, data.y);
    });

    container.append(this.dom);

    var self = this;

    // Give the Mite its properties
    function spawn(){

      self.set_position(rand(container.width()),
                        rand(container.height()));

      self.set_color('red');
    }

    // Makes the Mite move
    this.travel = function(x,y) {
      self.dom.animate({ left: x, top: y });
      self.set_position(x,y);
    };

    // Set a new position
    this.set_position = function(x,y) {
      self.position.x = x;
      self.position.y = y;
      self.dom.css({
        top: x,
        left: y
      });
    };

    // Set a color
    this.set_color = function(color) {
      self.dom.css({
        backgroundColor: color
      });
    };

    spawn();

  };

  function bind_events(container) {
    var container = $(container);

    container.bind('travel', function(e, data){
      $(this).children('.mite').each(function() {
        $(this).mite().travel(data.x, data.y);
      });
    });
  }

  function rand(limit) {
    return Math.floor(Math.random() * (limit + 1));
  }

  $.add_method = function(name, fn) {
    var old = this.fn[ name ];
    this.fn[ name ] = function(){
      if ( fn.length == arguments.length ) {
        return fn.apply( this, arguments );
      } else if ( typeof old == 'function' ) {
        return old.apply( this, arguments );
      }
    };
  }

  $.add_method('infest', function(){
    var m = new Mite(this);
  });

  $.add_method('infest', function(total){
    for (var i = 0; i <= total; i++) {
      $(this).infest();
    }
    bind_events(this);
  });

  $.add_method('mite', function(){
    return $(this).data('mite');
  });

})(jQuery)
