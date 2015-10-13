$(document).ready( function()
{
  $('#nav-contact').on('touchstart click', function() {goToDiv("#main-contact")});
  $('#nav-about').on('touchstart click', function() {goToDiv("#main-about")});
  $('#nav-work').on('touchstart click', function() {goToDiv("#main-featured-work")});

  var lastScrollTop = 0,
    delta = 100;

  $(function()
  {

    $(window).scroll(function(event)
    {
      var st = $(this).scrollTop();

      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      if (st > lastScrollTop)
      {
        //Hide nav
        $("nav").animate({top:-100}, 100);

      }
      else
      {
        // Show nav
        $("nav").animate({top:0}, 100);
      }
      lastScrollTop = st;
    });
  });

});

function goToDiv(target)
{
  $('html,body').animate({
      scrollTop: $(target).offset().top - 50},
      'slow');
}
