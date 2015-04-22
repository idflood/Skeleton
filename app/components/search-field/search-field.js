define(['jquery', 'search'], function($, Search){
  'use strict';


  var HIDDEN_CLASS = 'is-hidden';
  var FOCUS_CLASS = 'is-focused';
  var MUTED_BY_FILTER_CLASS = 'js-muted-by-filter';
  var $items = $('[data-searchable]');
  var filter = false;
  var searchString = '';


  var $searchContainer = $('.js-search');
  var $searchInput     = $searchContainer.find('.js-main-search-field > input');
  var $searchItems     = $searchContainer.find('.item-project');

  $searchContainer.search =
    new Search($searchContainer)
      .configure($searchInput, $searchItems)
      .on('search.end', function (evt, query, matchingItems, notMatchingItems) {
        matchingItems.forEach(function ($item) {
          if (!$item.hasClass(MUTED_BY_FILTER_CLASS)) {
            $item.parent().removeClass(HIDDEN_CLASS);
          }
        });
        notMatchingItems.forEach(function ($item) {
          $item.parent().addClass(HIDDEN_CLASS);
        });
      })
  $('.search-field')
    .on('focus.search-field', 'input', function(e) {
      $(this).parent().addClass(FOCUS_CLASS);
    })
    .on('blur.search-field', 'input', function(e) {
      $(this).parent().removeClass(FOCUS_CLASS)
    })
    .on('filter.filter-selected', '.filter', function (e, value, attribute) {
      $items.each(function (index, item) {
        var $item = $(item);
        if (value === "" || $item.data(attribute) === value) {
          $item
            .removeClass(MUTED_BY_FILTER_CLASS);

          // only show the item if it is not hidden (by the search)
          if (!$item.parent().hasClass(HIDDEN_CLASS)) {
            $item.parent().removeClass(HIDDEN_CLASS);
          }

        } else {
          $item
            .addClass(MUTED_BY_FILTER_CLASS)
            .parent()
            .addClass(HIDDEN_CLASS);
        }
      })
    });
});
