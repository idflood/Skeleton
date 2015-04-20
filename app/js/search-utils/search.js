define(['jquery'], function ($){
  var IS_SEARCHING_CLASS = 'js-is-searching';

  var DEFAULT_OPTIONS = {
    container         : '.js-search',
    inputFieldSelector: '.js-search-input-field',
    itemsSelector     : '.js-search-item',
    onSearchResults   : function (searchQuery, matchingItems, notMatchingItems) {
      console.log(searchQuery, matchingItems.length, notMatchingItems.length);
    },
    onSearchSelect    : null
  }

  function Search (options) {
    var me = this;
    this.options = options;
    this.id = options.id;
    this.$container = $(this.options.container)
    this.$input = this.$container.find(this.options.inputFieldSelector);
    this.$items = this.$container.find(this.options.itemsSelector);

    var previous = new Date();
    this.$container.on('change keyup', this.options.inputFieldSelector, function (evt) {
      me.$input.parent().addClass(IS_SEARCHING_CLASS);
      me.onInputChange(evt);
    });

    if (this.options.onSearchSelect) {
      this.$container.on('keypress', this.options.inputFieldSelector, $.proxy(function (evt) {
        var key = evt.which;
        if (key === 13) {
          this.options.onSearchSelect(this.matchingItems);
        }
      }, this));
    }

  }

  Search.prototype.onInputChange = function (evt) {

    var searchQuery = $(evt.currentTarget).val().toLowerCase();
    this.search(searchQuery);
    this.options.onSearchResults(searchQuery, this.matchingItems, this.notMatchingItems);
    this.$input.parent().removeClass(IS_SEARCHING_CLASS);
  };

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
