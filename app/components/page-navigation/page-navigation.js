define(['jquery'], function($){
  'use strict';

  var ACTIVE_CLASS = 'active';
  // If the active_offset is 0 an anchor become active even if this is only
  // one pixel at the bottom of the screen. Setting it to a higher value
  // will make a anchor active only if a bigger portion of the target is visible.
  var active_offset = 100;

  var $window = $(window);
  var $target = $('.page-navigation');
  var $links = $target.find('a');

  // Save the target of each links once so that we don't have to do it on each scroll, resize or click.
  $links.each(function() {
    var $this = $(this);
    $this.data('target', $($(this).attr('href')));
  });

  // Handle anchor click.
  $target.on('click.page-navigation', 'a', function(e) {
    var $target = $(this).data('target');
    // Only apply smooth scrolling if we found the target on the page.
    if ($target.length) {
      e.preventDefault();
      var target_position = $target.offset().top;
      // Since page navigation and header are fixed we need to remove them
      // from the target position.
      var offset = $('.header-menu-primary').height() + $('.page-navigation').height();
      $('html, body').animate({scrollTop: target_position - offset}, 600);

      // Call blur so that the link will have the active style visible and not
      // the :focus one.
      $(this).blur();
    }
  });

  // Set active anchor on scroll, resize and other events.
  var updateActiveLink = function() {
    var WINDOW_SCROLL = $window.scrollTop();
    var WINDOW_HEIGHT = $window.height();
    var WINDOW_BOTTOM = WINDOW_SCROLL + WINDOW_HEIGHT;
    var active_link = false;
    // Loop over all links, once a link target position is inside the window
    // or above it become active. Only the last one will be active.
    $links.each(function() {
      var $this = $(this);

      var $target = $this.data('target');
      if ($target && $target.length) {
        var target_position = $target.offset().top;
        if (target_position <= WINDOW_BOTTOM - active_offset) {
          active_link = $this;
        }
      }
    });

    // Remove the active class from all links except the active one.
    $links.not(active_link).removeClass(ACTIVE_CLASS);
    if (active_link) {
      // Add the active class to the current link.
      active_link.addClass(ACTIVE_CLASS);
    }
  };

  if ($target.length) {
    // Don't add resize and scroll handlers if there is no page-navigation.
    $(window).resize(function() {updateActiveLink();});
    $(window).on('orientationchange', function() {updateActiveLink();});
    $(window).on('scroll', function() {updateActiveLink();});
    updateActiveLink();
  }
});
