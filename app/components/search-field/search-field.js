define(['jquery', 'search'], function($, Search){
  'use strict';


  var HIDDEN_CLASS = 'is-hidden';
  var FOCUS_CLASS = 'is-focused';

  // we need to distiguish when an item is muted by the
  // filter and when an item is just hidden (because of the search)
  // see (1)
  var MUTED_BY_FILTER_CLASS = 'js-muted-by-filter';
  var MUTED_BY_SEARCH_CLASS = 'js-muted-by-search';
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
          // (1) do not show items that, even though they match the search
          // are muted by the filter
          $item.removeClass(MUTED_BY_SEARCH_CLASS);

          if (!$item.hasClass(MUTED_BY_FILTER_CLASS)) {
            $item.parent().removeClass(HIDDEN_CLASS);
          }
        });
        notMatchingItems.forEach(function ($item) {
          $item
            .addClass(MUTED_BY_SEARCH_CLASS)
            .parent()
            .addClass(HIDDEN_CLASS);
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

        // filter reset, show  the item if it is not muted by search
        if (value === "") {
          $item.removeClass(MUTED_BY_FILTER_CLASS);

          if (!$item.hasClass(MUTED_BY_SEARCH_CLASS)) {
            $item
              .parent()
              .removeClass(HIDDEN_CLASS);
          }

        } else if ($item.data(attribute) === value) {
          // item matches filter, only show it if it is not muted by search
          $item
            .removeClass(MUTED_BY_FILTER_CLASS);

          // If the item is already hidden (this is because of search)
          // do not show it.
          if (!$item.parent().hasClass(HIDDEN_CLASS)) {
            $item.parent().removeClass(HIDDEN_CLASS);
          }

        } else {
          // item doesn't match filter, hide it always
          $item
            .addClass(MUTED_BY_FILTER_CLASS)
            .parent()
            .addClass(HIDDEN_CLASS);
        }
      })
    });
});
