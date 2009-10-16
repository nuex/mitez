(function(){

  var Mite = function(){

    this.position = {};
    this.position.left = rand();
    this.position.right = rand();

    this.target = {};
    this.target.position = {};

    this.dom = $('<div class="mite"></div>');

    var self = this;

    this.travel = function() {
      self.dom.animate({
        top: self.target.position.top,
        left: self.target.position.left
      });
      self.position.top = self.target.position.top;
      self.position.left = self.target.position.left;
    }

  };

  $.fn.infest = function(){
    var m = new Mite();
  };

})(jQuery)
