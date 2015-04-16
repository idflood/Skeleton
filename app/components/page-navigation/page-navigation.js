define(['jquery'], function($){
  'use strict';

  $('.page-navigation').on('click.page-navigation', 'a', function(e) {
    var $target = $($(this).attr('href'));
    // Only apply smooth scrolling if we found the target on the page.
    if ($target.length) {
      e.preventDefault();
      $('html, body').animate({scrollTop: $target.offset().top}, 600);
    }
  });
});
