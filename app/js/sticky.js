require(['jquery'], function ($) {
  var STICKY_ITEMS_SELECTOR = '.js-sticky-item';
  var STICKY_CLASS = 'js-is-sticky';
  var $stickyItems = $(STICKY_ITEMS_SELECTOR);

  var stickyItems = [];
  $stickyItems.each(function () {
    var $stickyItem = $(this);
    var id = $stickyItem.data('sticky-id');
    var itemOffset = $stickyItem.offset().top;
    var distance = $stickyItem.data('sticky-distance') || 0;

    stickyItems.push({
      id: id,
      $item: $stickyItem,
      offset: itemOffset - distance
    })
  });

  var $w = $(window);
  var $b = $('body');

  $w.on('scroll', function () {
    var scroll = $w.scrollTop();
    stickyItems.forEach(function (stickyItem) {
      if (scroll >= stickyItem.offset) {
        stickyItem.$item.addClass(STICKY_CLASS);
        $b.addClass(STICKY_CLASS + '--' + stickyItem.id);
      } else {
        stickyItem.$item.removeClass(STICKY_CLASS);
        $b.removeClass(STICKY_CLASS + '--' +stickyItem.id);
      }
    });
  });
  // Trigger scroll event so that it is placed correctly on load.
  $w.trigger('scroll');
})
