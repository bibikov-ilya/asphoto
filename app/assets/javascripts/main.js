var App = {

}

$(document).on('click', '#rail.rail-next, #rail-buttons .rail-next', function() {
  TweenMax.to($('#rail img:first'), 0.3, {delay: 0.3, opacity: 0.3});
  console.log('FUCK!');
});

$(document).on('click', '#rail.rail-prev, #rail-buttons .rail-prev', function() {
});