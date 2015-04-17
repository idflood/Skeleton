define(['jquery'], function($){
  'use strict';
  var OPEN_CLASS = 'is-open';

  $('body').on('click.filter', function(e) {
    var $target = $(e.target);
    var is_click_inside_callout = $target.closest('.filter-callout').length;

    // If we click on the button we toggle the callout.
    if ($target.hasClass('filter-button')) {
      $('.filter').toggleClass(OPEN_CLASS);
      return;
    }

    // We close the callout if we clicked outside or if we clicked on a item.
    if (!is_click_inside_callout || $target.hasClass('filter-content-item')) {
      $('.filter').removeClass(OPEN_CLASS);
    }
  });
});
