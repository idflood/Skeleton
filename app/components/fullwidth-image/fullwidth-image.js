define(['jquery'], function($){
  'use strict';

  $('.fullwidth-image').on('click.fullwidth-image', '.fullwidth-image-arrow', function(e) {
    var $target = $($(this).attr('href'));
    // Only apply smooth scrolling if we found the target on the page.
    if ($target.length) {
      e.preventDefault();
      $('html, body').animate({scrollTop: $target.offset().top}, 600);
    }
  });
});
