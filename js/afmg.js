$(document).ready( function()
{

});

function goToDiv(target)
{
  $('html,body').animate({
      scrollTop: $(target).offset().top - 50},
      'slow');
}
