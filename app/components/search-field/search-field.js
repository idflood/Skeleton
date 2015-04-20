define(['jquery', 'search'], function($, Search){
  'use strict';


  var HIDDEN_CLASS = 'is-hidden';
  var FOCUS_CLASS = 'is-focused';
  var MUTED_BY_FILTER_CLASS = 'js-muted-by-filter';
  var $items = $('[data-searchable]');
  var filter = false;
  var searchString = '';

  var searchFieldSearch = new Search({
    id                : 'search-field',
    container         : '.js-search',
    inputFieldSelector: '.js-main-search-field > input',
    itemsSelector     : '.item-project',
    onSearchResults   : function (searchQuery, matchingItems, notMatchingItems) {
      matchingItems.forEach(function ($item) {
        if (!$item.hasClass(MUTED_BY_FILTER_CLASS)) {
          $item.parent().removeClass(HIDDEN_CLASS);
        }
      });
      notMatchingItems.forEach(function ($item) {
        $item.parent().addClass(HIDDEN_CLASS);
      });
    },
    onSearchSelect: function (matchingItems) {
      if (matchingItems.length === 1) {
        var value = highlight.getOriginalText(matchingItems[0]);
        $filter.find('.filter-value').text(value);
        $filter.find('.filter-value-input').val(value).trigger('change');
        $filter.find('.search-field input').val(value);
        $filter.trigger('filter-has-changed', [value, attribute]);
        $filter.toggleClass(OPEN_CLASS);
      }
    }
  });

  $('.search-field.js-main-search-field')
    .on()

  $('.search-field')
    .on('focus.search-field', 'input', function(e) {
      $(this).parent().addClass(FOCUS_CLASS);
    })
    .on('blur.search-field', 'input', function(e) {
      $(this).parent().removeClass(FOCUS_CLASS)
    })
    .on('filter-has-changed', '.filter', function (e, value, attribute) {
      $items.each(function (index, item) {
        var $item = $(item);
        if (value === "" || $item.data(attribute) === value) {
          $item
            .removeClass(MUTED_BY_FILTER_CLASS)
            .parent()
            .removeClass(HIDDEN_CLASS);
        } else {
          $item
            .addClass(MUTED_BY_FILTER_CLASS)
            .parent()
            .addClass(HIDDEN_CLASS);
        }
      })
    });
});
