define(['jquery'], function($){
  'use strict';
  var OPEN_CLASS = 'is-open';
  var $filter = $('.filter');

  $('body').on('click.filter', function(e) {
    var $target = $(e.target);
    var is_click_inside_callout = $target.closest('.filter-callout').length;

    // If we click on the button we toggle the callout.
    if ($target.hasClass('filter-button')) {
      $filter.toggleClass(OPEN_CLASS);
      return;
    }

    // We close the callout if we clicked outside.
    if (!is_click_inside_callout) {
      $filter.removeClass(OPEN_CLASS);
    }
  });

  $('body').on('click.filter', '.filter-item', function(e) {
    e.preventDefault();

    // Close the callout.
    $filter.removeClass(OPEN_CLASS);

    // Get the value of the selected filter.
    var selected = $(this).attr('href').replace('#', '');
    // If we selected "Alle" set the value to false.
    if (selected == '') {
      selected = false;
    }

    // Keep the clicked value in the filter data
    $filter.data('value', selected);

    // Trigger the custom event.
    $filter.trigger('filter', [selected]);
  });
});
