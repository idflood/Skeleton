define(['jquery'], function ($){

  var EVENTS = {
    START  : 'search.start',
    END    : 'search.end',
    SELECT : 'search.select'
  }

  /**
   * Creates a new Search class that is responsible
   * for generic searching.
   *
   * It only needs:
   *  - a $root element, so it can trigger custom events on this element.
   *  - an $input element, so it can watch for queries and selection (ENTER keypress)
   *  - an $items elements, which is a list of nodes to do the search.
   *
   * This doesn't actually perform any action on the $items (like showing/hiding or
   * highlighting). Instead, it only analyses with $items match the search query
   * of the $input.
   *
   * The matching works as follows:
   *   - the .html() of the $item is analyses and if it *search query*
   *     is contained in it, the item matches the query.
   *
   *
   * USAGE:
   *
   *  new Search($root)
   *   .configure($input, items)
   *   .on('search.start', function (evt) {
   *      // You might want to add a loading indicator here.
   *    })
   *   .on('search.end', function (evt, query, matchingItems, notMatchingItems) {
   *     // You might want to show/hide items or/and do some kind of highlighting.
   *   })
   *   .on('search.select', function (evt, matchingItems) {
   *     // You might do select some item or go into a detail page
   *     // if the select results in only one matching item.
   *   });
   *
   * @class
   */
  function Search ($root) {
    this.$root  = $root;
    this.$input = null;
    this.$items = null;
  }

  Search.prototype.configure = function ($input, $items) {
    var self = this;

    this.$input = $input;
    this.$items = $items;

    this.matchingItems    = [];
    this.notMatchingItems = [];

    this.$input.on('change keyup', function (evt) {
      self.$root.trigger(EVENTS.START);
      var searchQuery = $(evt.currentTarget).val().toLowerCase();
      self.search(searchQuery);
      self.$root.trigger(EVENTS.END, [
          searchQuery,
          self.matchingItems,
          self.notMatchingItems
        ]);
    });

    this.$input.on('keypress', function (evt) {
      var key = evt.which;
      if (key === 13) {
        self.$root.trigger(EVENTS.SELECT, [self.matchingItems]);
      }
    });

    return this.$root;
  }

  Search.prototype.search = function (searchQuery) {
    var self = this;

    this.matchingItems    = [];
    this.notMatchingItems = [];

    this.$items.each(function (index, item) {
      var $item = $(item);
      var text  = $item.data('highlight-old') || $item.html();
      if (text.toLowerCase().indexOf(searchQuery) !== -1) {
        self.matchingItems.push($item);
      } else {
        self.notMatchingItems.push($item);
      }
    });
  }

  return Search;
})
