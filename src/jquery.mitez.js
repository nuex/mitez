(function($){

  /*
   * Build up the Mite model.
   *
   * Calling $.Mite.behaviors.FooBehavior = FooMite will add a new behavior.
   *
   * Calling $.Mite.create will build and return a new mite.
   *
   * Creating a new mite happens like this:
   *   * Mixin behaviors by copying in defaults from behavior
   *   * Add a listener for the event 'Mite.Tick'
   *   * Each event gets dispatched by onReact to be onEVENT, per EVENT
   *
   */
  $.extend({
    Mite: {
      behaviors: {},

      callbacks: ['Tick', 'BringToLife'],

      default_mite: {

        stopped: false,

        html: '<div class="mite"></div>',

        dom: null,

        react: function(evt) {
          if(this.stopped){return;}
          var cb_chain = this.callbacks[evt.data.type]
          if (cb_chain) {
            var _self = this
            $.each(cb_chain, function() {
              (this)(_self, evt)
            })
          }
        },

        bind: function(){
          if (this.element) {
            var _self = this
            this.element.bind('Mite.Tick', {type: 'Tick'}, function(e){_self.react(e)})
          }
        },

        add_behaviors: function() {

          // pick a random behavior if one isn't specified
          if (!this.behaviors) {
            var possible = []
            for(var b in $.Mite.behaviors) {
              possible.push(b)
            }
            if (possible.length > 0) {
              this.behaviors = [possible[Math.floor(Math.random() * possible.length)]]
            } else {
              this.behaviors = []
            }
          }

          // behaviors is a list of names, b2 is the acutal behavior class
          // 'this' is set by each, copy it into _self
          var _self = this
          $.each(this.behaviors, function() {
            var b2 = $.Mite.behaviors[this]
            if (!b2) { return }

            // copy in data
            if (undefined == _self.data) {
              _self.data = {}
            }
            _self.data[b2] = $.extend({}, b2.data)

            // copy in callbacks
            $.each($.Mite.callbacks, function() {
              var cb = b2['on' + this]
              if (cb) {
                if (undefined == _self.callbacks) {
                  _self.callbacks = {}
                }
                if (undefined == _self.callbacks[this]) {
                  _self.callbacks[this] = []
                }
                _self.callbacks[this].push(cb)
              }
            })

            // there can be a callback for more customization
            // that only the behavior class has to know about
            if (b2.onBehaviorAdded) {
              b2.onBehaviorAdded(_self)
            }
          })
        },

        bring_to_life: function() {
          this.dom = $(this.html)
          this.dom.data('mite', this)
          this.element.append(this.dom)
          var tp = Math.floor(Math.random() * this.element.height());
          var lft = Math.floor(Math.random() * this.element.width());
          this.dom.css({top: tp, left: lft})

          var cb_chain = this.callbacks['BringToLife']
          if (cb_chain) {
            var _self = this
            $.each(cb_chain, function() {
              (this)(_self)
            })
          }
        }
      },

      create: function(opts) {
        var mite = {}
        $.extend(mite, $.Mite.default_mite)
        $.extend(mite, opts)
        mite.add_behaviors()
        mite.bind()
        mite.bring_to_life()
        return mite
      }
    }
  })

  $.fn.extend({
    /**
     * Infest will take a number (default 20)
     * and add that many mites with random behaviors
     * to selected element(s).
     *
     * $('#mitez').infest(200)
     *
     */
    infest: function(count, options) {
      if (undefined == count) {
        count = 20
      }

      this.each(function(){
        for (var i=0 ; i<count ; i++) {
          var defaults = {num: i}
          var settings = (options ? $.extend(defaults, options) : defaults);
          $(this).add_mite(settings)
        }
      })
      return this
    },

    /**
     * add_mite will create a new mite in the selected element
     * you can specify parameters or accept randomness as default
     *
     * $('#mitez').add_mite({color: '#F00', speed: 10, behaviors: ['drunk']})
     * (or should it be)
     * $('#mitez').add_mite({drunk: {color: '#F00', speed: 10}})
     */
    add_mite: function(desc) {
      if (undefined == desc) {
        desc = {}
      }
      var mites = this.data('mitez')
      if (undefined == mites) {
        mites = []
      }
      desc.element = this
      mites.push($.Mite.create(desc))
      this.data('mitez', mites)
      return this
    }
  })

})(jQuery)
