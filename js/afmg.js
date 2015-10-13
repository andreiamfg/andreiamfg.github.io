$(document).ready( function()
{
  $('#nav-contact').on('click touchstart', function() {goToDiv("#main-contact")});
  $('#nav-about').on('click touchstart', function() {goToDiv("#main-about")});
  $('#nav-work').on('click touchstart', function() {goToDiv("#main-featured-work")});
});

function goToDiv(target)
{
  $('html,body').animate({
      scrollTop: $(target).offset().top - 50},
      'slow');
}
