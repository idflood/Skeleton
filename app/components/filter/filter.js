define(['jquery', 'search', 'highlight'], function($, Search, highlight){
  'use strict';

  var HIDDEN_CLASS = 'js-is-hidden';


  var OPEN_CLASS = 'is-open';
  var $filter = $('.filter');

  var attribute     = $filter.data('filter-attribute');

  var $filterInput = $filter.find('.js-secondary-search-field > input');
  var $filterItems = $filter.find('.filter-item');

  $filter.search =
    new Search($filter)
      .configure($filterInput, $filterItems)
      // the filter is not interested on this, for now.
      // .on('search.start', function () {
      //   console.log('search start');
      // })
      .on('search.end', function (evt, query, matchingItems, notMatchingItems) {
        console.log('search end', query, matchingItems.length, notMatchingItems.length);
          matchingItems.forEach(function ($item) {
            $item.removeClass(HIDDEN_CLASS);
            highlight.highlightElement($item, query);
          });
          notMatchingItems.forEach(function ($item) {
            $item.addClass(HIDDEN_CLASS);
          });
      })
      .on('search.select', function (evt, matchingItems) {
        console.log('search select');
        if (matchingItems.length === 1) {
          var value = highlight.getOriginalText(matchingItems[0]);
          $filter.find('.filter-text-value').text(textValue);
          $filter.find('.search-field input').val(value);
          $filter.trigger('filter-has-changed', [value, attribute]);
          $filter.toggleClass(OPEN_CLASS);
        }
      });

  $filter.on('click.filter', '.filter-item', function (e) {
    var $item = $(this);

    var value = highlight.getOriginalText($item);
    var textValue = value;

    if ($item.hasClass('filter-item--all')) {
      textValue = $item.data('original');
      value = "";
    }

    $filter.find('.filter-text-value').text(textValue);
    $filter.find('.search-field input').val(value);
    $filter.trigger('filter-has-changed', [value, attribute]);

  });

  $('body').on('click.filter', function(e) {
    var $target = $(e.target);
    var is_click_inside_callout = $target.closest('.filter-callout').length;

    // If we click on the button we toggle the callout.
    if ($target.hasClass('filter-button') || $target.parent().hasClass('filter-button')) {
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
