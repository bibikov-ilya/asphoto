var $window = $(window);

var App = {
  resize: function() {
    //$window.resize(function() {
    $(window).on("debouncedresize", function() {
      if ($('#rail img').length) {
        App.rail.length();
        App.rail.focus(self.currentIndex);
      }
    });
  },

  start: function() {        
    self = this;
    
    if($('body').hasClass('image-copyright')) {
        // App.image_copyright();
    }

    App.rail.start();
    App.resize();
  },

  rail: {
    focus: function(index) {
      // if ($('#rail img:eq(' + index + ')').length && index >= 0) {
        // unactive buttons on boundary photos
        // $('#rail-buttons span').removeClass('unactive');                    
        // if( index === 0 ) {
        //     $('.rail-prev span').addClass('unactive');
        // }      
        // if( index+1 >= $('#rail img').length ) {
        //     $('.rail-next span').addClass('unactive');
        // }

        // looped ratation
        if (index < 0)
          index = $('#rail img').length - 1;
        else if (index >= $('#rail img').length)
          index = 0;
        self.currentIndex = index;

        var elementLeftPosition = parseInt($('#rail img:eq(' + index + ')').position().left, 10);
        var centerPosition = (elementLeftPosition - ($window.width() * 0.5)) + $('#rail img:eq(' + index + ')').width() * 0.5;

        TweenMax.to($('#rail img:not(:eq(' + index + '))'), 0.3, {delay: 0.3, opacity: 0.3});
        TweenMax.to($('#rail img:eq(' + index + ')'), 0.3, {delay: 0.3, opacity: 1});

        TweenMax.to($('#rail'), 0.8, {left: -centerPosition, ease: Expo.easeInOut});
      // }
    },

    nav: function() {
      $(document).on('click', '#rail-buttons .rail-next', function() {
        App.rail.focus(self.currentIndex + 1);
      });

      $(document).on('click', '#rail-buttons .rail-prev', function() {
        App.rail.focus(self.currentIndex - 1);
      });
    },

    length: function() {
      var totalRailWidth = 0;

      $('#rail img').each(function() {
        totalRailWidth += parseInt($(this).width(), 10);
      });
      
      totalRailWidth += 3000;

      $('#rail').width(totalRailWidth + (totalRailWidth * 0.01));
    },

    start: function() {
      self.currentIndex = 1;

      App.rail.length();
      App.rail.nav();
      App.rail.focus(self.currentIndex);
    }
  }
};

$(window).load(function() {
  App.start();
});
