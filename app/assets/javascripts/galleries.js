var $window = $(window);
var self;

var App = {
  resize: function() {
    // $window.resize(function() {
    $(window).on("debouncedresize", function() {
      if ($('#rail img').length) {
        App.rail.length();
        App.rail.focus(self.currentIndex);
      }
    });
  },

  image_copyright: function() {
    var copyTimer;
    
    $(document).on('contextmenu', '.copyright, #rail img, #main-menu', function(e) {
      clearTimeout(copyTimer);
      $('#image-copyright').show().css('top', e.screenY - 90).css('left', e.screenX + 10);
      copyTimer = setTimeout(function() {
        $('#image-copyright').fadeOut(150);
      }, 2000);
      return false;
    });        
  },

  menu: {
    hide: function() {
      var menu = $('#main-menu');
      menu.removeClass('visible');
      TweenMax.to(menu, 0.4, {left: -menu.width(), ease: Expo.easeInOut});
      TweenMax.to($('#menu-toggle'), 0.4, {opacity: 1, ease: Expo.easeInOut});
    },

    open: function() {
      var menu = $('#main-menu');
      menu.addClass('visible');
      TweenMax.to(menu, 0.4, {left: 0, ease: Expo.easeInOut});
      TweenMax.to($('#menu-toggle'), 0.4, {opacity: 0, ease: Expo.easeInOut});
    },

    bind: function() {
      $(document).on('click', '#menu-toggle', function(event) {
        App.menu.open();
        // var menuToggle = $('#menu-toggle'), menu = $('#main-menu');
        // var postitonMenu = 0, positionButtons = 0;

        // if (menu.hasClass('visible')) {
        //   menu.toggleClass('visible');
        //   menuToggle.removeClass('cross');
        //   postitonMenu = -menu.width();
        //   positionButtons = 40;
        // } else {
        //   menu.addClass('visible');
        //   menuToggle.addClass('cross');
        //   postitonMenu = 0;
        //   positionButtons = menu.width() + 40;
        // }

        // TweenMax.to(menu, 0.4, {left: postitonMenu, ease: Expo.easeInOut});
        // TweenMax.to($('#menu-toggle'), 0.4, {left: positionButtons, ease: Expo.easeInOut});
      });

      $(document).on('click', '#rail, #rail-info', function() {
        App.menu.hide();
      });
    }
  },

  social_icons: function() {
    $('.social a').bind('mouseenter', function() {
      TweenLite.to($('.social-holder .round-pad'), 0.4, {opacity: 1, top: 15, left: $(this).position().left + 3, ease: Back.easeOut});
    }).bind('mouseleave', function() {
      TweenLite.to($('.social-holder .round-pad'), 0.4, {opacity: 0, top: 15});
    });
  },

  start: function() {        
    self = this;
    
    App.image_copyright();
    App.menu.bind();
    App.social_icons();

    App.rail.start();
    App.resize();
  },

  rail: {
    focus: function(index) {
      // if ($('#rail img:eq(' + index + ')').length && index >= 0) {
        // unactive buttons on boundary photos
        // $('#rail-buttons span').removeClass('unactive');                    
        // if( index === 0 ) {
        //     $('#rail-prev span').addClass('unactive');
        // }      
        // if( index+1 >= $('#rail img').length ) {
        //     $('#rail-next span').addClass('unactive');
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
      $(document).on('click', '#rail-buttons #rail-next', function() {
        App.rail.focus(self.currentIndex + 1);
      });

      $(document).on('click', '#rail-buttons #rail-prev', function() {
        App.rail.focus(self.currentIndex - 1);
      });

      $('#rail').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          switch (direction)
          {
            case 'left': App.rail.focus(self.currentIndex + 1); break;
            case 'right': App.rail.focus(self.currentIndex - 1); break;
          }
        }
      });

      $(window).on('mousewheel', function(e) {
        if (e.originalEvent.wheelDelta > 0) {
            // scroll up
            App.rail.focus(self.currentIndex - 1);
        } else {
            // scroll down
            App.rail.focus(self.currentIndex + 1);
        }
      });
    },

    length: function() {
      var totalRailWidth = 0;

      $('#rail img').each(function() {
        totalRailWidth += parseInt($(this).width(), 10);
      });
      
      totalRailWidth += 3000;

      // $('#rail-slider').width(totalRailWidth);
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
