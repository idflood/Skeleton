define(['jquery'], function($){
  'use strict';
  var OPEN_CLASS = 'is-open';

  $('.accordion').on('click.accordion', '.accordion-toggle', function(e) {
    e.preventDefault();
    var $item = $(this).closest('.accordion-item');
    var $items = $(this).closest('.accordion').find('.accordion-item');

    // If we clicked on a item which is already opened we simply close it.
    if ($item.hasClass(OPEN_CLASS)) {
      $item.removeClass(OPEN_CLASS);
      return;
    }

    // Else remove any opened item.
    // $items.removeClass(OPEN_CLASS);

    // And open the current item.
    $item.addClass(OPEN_CLASS);
  });
});
