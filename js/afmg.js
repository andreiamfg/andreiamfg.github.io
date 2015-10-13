$(document).ready( function()
{
  $('#nav-contact').on('touchstart click', function() {goToDiv("#main-contact")});
  $('#nav-about').on('touchstart click', function() {goToDiv("#main-about")});
  $('#nav-work').on('touchstart click', function() {goToDiv("#main-featured-work")});
});

function goToDiv(target)
{
  $('html,body').animate({
      scrollTop: $(target).offset().top - 50},
      'slow');
}
