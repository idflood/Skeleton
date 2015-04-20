define(['jquery'], function($){
  'use strict';
  var HIDDEN_CLASS = 'is-hidden';
  var FOCUS_CLASS = 'is-focused';
  var $items = $('[data-searchable]');
  var filter = false;
  var searchString = '';

  $('.search-field')
    .on('focus.search-field', 'input', function(e) {
      $(this).parent().addClass(FOCUS_CLASS);
    })
    .on('blur.search-field', 'input', function(e) {
      $(this).parent().removeClass(FOCUS_CLASS)
    })
    .on('change.search-field, keyup.search-field', 'input', function(e) {
      // Trim whitespace from start and end of the searchstring.
      searchString = $.trim($(this).val());
      console.log("on change", searchString);
      filterContent();
    })
    .on('filter.search-field', '.filter', function(e, filterValue) {
      filter = filterValue;
      filterContent();
    });

  var strContains = function(str, search) {
    // Check for index on lowercased string so that it is case insensitive.
    return str.toLowerCase().indexOf(search.toLowerCase()) > -1;
  }

  var filterContent = function() {
    // If there is no filter and no search string we simply display all items.
    if (filter === false && searchString == '') {
      $items.parent().removeClass(HIDDEN_CLASS);
      return;
    }

    // Loop over all searchable items.
    $items.each(function() {
      var isVisible = true;
      var $this = $(this);

      console.log(filter);
      // If there is a filter and the item doesn't match it we hide the item.
      if (filter && $this.data('filter') != filter) {
        isVisible = false;
      }

      // If item is alredy hidden by the filter no need to search for string.
      if (isVisible) {
        var text = $this.text();
        if (searchString != '' && strContains(text, searchString) === false) {
          isVisible = false;
        }
      }
      // Need to set the visibility class on the parent (the grid-cell).
      $this.parent().toggleClass(HIDDEN_CLASS, !isVisible);
    });
  };
});
