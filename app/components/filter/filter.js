define(['jquery', 'search', 'highlight'], function($, Search, highlight){
  'use strict';


  /**
   * The filter module does the following things:
   *   1) opens when clicking on the filter button when it is closed.
   *   2) closes when clicking on the outside of the filter OR clicking
   *      on the filter button when it is opened.
   *   3) when opened:
   *       3.1) uses the Search functionality to filter items in its
   *            itemsGroups:
   *
   *            a) when a search is completed it shows and highlights
   *               matching items; it hides notMatching items
   *
   *            b) when an item is selected (via ENTER on the input field)
   *               it selects that item and closes. (similar to 3.2)
   *      3.2) when a user clicks on an item in its itemGroups it selects
   *           that item and closes.
   *
   *      3.3) when a user clicks on the "All" it clears the filter
   *          and closes (it keeps any search query, if any is present).
   *
   */

  var HIDDEN_CLASS = 'js-is-hidden';
  var OPEN_CLASS = 'is-open';
  var EVENTS = {
    FILTER_SELECTED: 'filter.filter-selected'
  };


  var $filter = $('.filter');

  var $filterInput = $filter.find('.js-secondary-search-field > input');
  var $filterItems = $filter.find('.filter-item');

  $filter.search =
    new Search($filter)
      .configure($filterInput, $filterItems)
      .on('search.end', function (evt, query, matchingItems, notMatchingItems) {
          matchingItems.forEach(function ($item) {
            $item.removeClass(HIDDEN_CLASS);
            highlight.highlightElement($item, query);
          });
          notMatchingItems.forEach(function ($item) {
            $item.addClass(HIDDEN_CLASS);
          });
      })
      .on('search.select', function (evt, matchingItems) {
        if (matchingItems.length === 1) {
          var value = highlight.getOriginalText(matchingItems[0]);
          activateFilter(value)
        }
      });

  $filter.on('click.filter', '.filter-clear', function (e) {
    var $item = $(this);
    var originalText = $item.data('original');
    activateFilter('', originalText);
  });

  // 3.1 b) an item being selected by clicking on it.
  $filter.on('click.filter', '.filter-item', function (e) {
    var $item = $(this);
    var value = highlight.getOriginalText($item);

    activateFilter(value)
  });

  /**
   *
   * What it means to have a selected filter?
   * Selecting a filter means 2 things:
   *   1) changing the filter button text.
   *   2) triggering the 'filter-has-changed' event with the value of the selected field
   *   3) close the filter
   **/
  function activateFilter (filterValue, filterText) {
    var attribute = $filter.data('filter-attribute');

    var filterText = filterText || filterValue;
    // 1)
    $filter.find('.filter-text-value').text(filterText);
    // 2)
    $filter.trigger(EVENTS.FILTER_SELECTED, [filterValue, attribute]);
    // 3)
    $filter.toggleClass(OPEN_CLASS);
  }

  // See 1) and 2) description above.
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
});
