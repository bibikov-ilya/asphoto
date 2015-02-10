var $window = $(window);

var App = {
  rail: {
    focus: function(index) {
      self.currentIndex = index;
      console.log(index);

      var elementLeftPosition = parseInt($('#rail img:eq(' + index + ')').position().left, 10);
      var centerPosition = (elementLeftPosition - ($window.width() * 0.5)) + $('#rail img:eq(' + index + ')').width() * 0.5;

      // TweenMax.to($('#rail img:eq('+currentIndex+')'), 0.3, {delay: 0.3, opacity: 0.3});
      TweenMax.to($('#rail'), 0.8, {left: -centerPosition, ease: Expo.easeInOut});
    },

    nav: function() {
      $(document).on('click', '#rail-buttons .rail-next', function() {
        App.rail.focus(self.currentIndex + 1);
      });

      $(document).on('click', '#rail-buttons .rail-prev', function() {
        App.rail.focus(self.currentIndex - 1);
      });
    },

    start: function() {
      self.currentIndex = 1;

      App.rail.nav();
      App.rail.focus(self.currentIndex);
    }
  }
};

$(window).load(function() {
  App.rail.start();
});
