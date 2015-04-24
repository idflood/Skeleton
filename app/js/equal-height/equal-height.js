define(['jquery'], function ($){
  function EqualHeight(target) {
    this.$target = $(target);
    if (this.$target.length) {
      this.init();
    }
  }

  EqualHeight.prototype.onResize = function() {
    var WINDOW_WIDTH = $(window).width();

    this.$target.each(function() {
      var $container = $(this);
      var $elements = $container.data('equal-height-elements');

      // TODO: use the sensible method to retrive the scss breakpoints.
      if (WINDOW_WIDTH <= 740) {
        // On mobile simply set height to auto.
        $elements.height('auto');
        return;
      }

      // Set height to be auto first so that elements can be smaller.
      $elements.height('auto');

      var max_height = 0;
      // Loop over elements and get the max heigth.
      $elements.each(function() {
        max_height = Math.max(max_height, $(this).height());
      });

      // Apply the max height to elements.
      $elements.height(max_height);
    });
  }

  EqualHeight.prototype.init = function() {
    // Save elements to resize on init so that we don't have to do a dom
    // search on each resize.
    this.$target.each(function() {
      var $container = $(this);
      var $elements = $container.find($container.data('equal-height'));
      console.log($elements);
      $container.data('equal-height-elements', $elements);
    });
    // Recalculate elements height on resize and trigger resize.
    var self = this;
    $(window).resize(function() {self.onResize();});
    $(window).on('orientationchange', function() {self.onResize();});
    this.onResize();
  }

  return EqualHeight;
});
