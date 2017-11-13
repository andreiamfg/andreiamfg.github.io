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

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function goToDiv(target)
{
  $('html,body').animate({
      scrollTop: $(target).offset().top - 50},
      'slow');
}

function onVisibilityChange (el)
{
  return function ()
  {
      console.log('visibility ' + isElementInViewport(el));
  }
}

function registerVisibilityChange()
{
  var handler = onVisibilityChange($('#visual-skills'));
  
  //jQuery
  $(window).on('DOMContentLoaded load resize scroll', handler);
}


