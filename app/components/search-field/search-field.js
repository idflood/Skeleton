define(['jquery', 'search'], function($, Search){
  'use strict';


  var HIDDEN_CLASS = 'is-hidden';
  var FOCUS_CLASS = 'is-focused';

  // We add utility classes so that we know if the item is muted
  // by search of by filter
  var MUTED_BY_FILTER_CLASS = 'js-muted-by-filter';
  var MUTED_BY_SEARCH_CLASS = 'js-muted-by-search';

  var $searchContainer = $('.js-search');
  var $searchInput     = $searchContainer.find('.js-main-search-field > input');
  var $searchItems     = $searchContainer.find($searchContainer.data('search-items-selector'));
  var $searchGroups    = $searchContainer.find($searchContainer.data('search-group-selector'));

  var hasSearchGroups = $searchGroups.length > 0;

  $searchContainer.search =
    new Search($searchContainer)
      .configure($searchInput, $searchItems)
      .on('search.end', function (evt, query, matchingItems, notMatchingItems) {
        matchingItems.forEach(function ($item) {
          // (1) do not show items that, even though they match the search
          // are muted by the filter
          $item.removeClass(MUTED_BY_SEARCH_CLASS);
          updateItemVisibility($item);
        });
        notMatchingItems.forEach(function ($item) {
          $item.addClass(MUTED_BY_SEARCH_CLASS)
          updateItemVisibility($item);
        });

        if (hasSearchGroups) {
          updateGroupsVisibility();
        }
      })


  /**
   * Decide wheter or not an item is visible.
   * An item is visible if it is not muted by
   * search nor filter.
   * @param  {Jquery} $item
   * @return {void}
   */
  function updateItemVisibility($item) {
    if ($item.hasClass(MUTED_BY_SEARCH_CLASS) || $item.hasClass(MUTED_BY_FILTER_CLASS)) {
      $item.parent().addClass(HIDDEN_CLASS);
    } else {
      $item.parent().removeClass(HIDDEN_CLASS);
    }
  }

  function updateGroupsVisibility () {
    $searchGroups.each(function () {
      var $group = $(this);
      var groupItemsSelector = $searchContainer.data('search-items-selector');
      var isGroupVisible = false;
      $group.find(groupItemsSelector).each(function () {
        var $item = $(this);
        if (!$item.parent().hasClass(HIDDEN_CLASS)) {
          isGroupVisible = true;
        }
      });

      if (!isGroupVisible) {
        $group.addClass(HIDDEN_CLASS);
      } else {
        $group.removeClass(HIDDEN_CLASS);
      }

    })
  }


  $('.search-field')
    .on('focus.search-field', 'input', function(e) {
      $(this).parent().addClass(FOCUS_CLASS);
    })
    .on('blur.search-field', 'input', function(e) {
      $(this).parent().removeClass(FOCUS_CLASS)
    })
    .on('filter.filter-selected', '.filter', function (e, value, attribute) {
      $searchItems.each(function (index, item) {
        var $item = $(item);

        // Update muted class
        if (value === "" || $item.data(attribute) === value) {
          $item.removeClass(MUTED_BY_FILTER_CLASS);
        } else {
          $item.addClass(MUTED_BY_FILTER_CLASS)
        }
        // Update item visibility
        updateItemVisibility($item);
      });
      if (hasSearchGroups) {
        updateGroupsVisibility();
      }
    });
});
