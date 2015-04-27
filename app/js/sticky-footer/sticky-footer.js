define(['jquery'], function ($){
  // The basic idea for this sticky footer.
  // (1) Use position absolute for the footer and footer job.
  // (2) Add an empty div at the same place with the same height as the footer.
  // (3) Resize these div so that they always match footer and footer-job height.
  // These 2 empty div are used to add enough space after the content.
  function StickyFooter() {
    this.$body = $('body');
    this.$footer = $(".footer");
    this.$footerClone = false;
    this.$footerJob = $('.footer-job');
    if (this.$footer.length) {
      this.init();
    }
  }

  StickyFooter.prototype.onResize = function() {
    var footer_height = this.$footer.outerHeight()
    if (this.$footerClone) {
      this.$footerClone.height(footer_height);
    }
    if (this.$footerJobClone) {
      this.$footerJobClone.height(this.$footerJob.outerHeight());
      // Adapt the bottom to not overlap the footer.
      this.$footerJob.css('bottom', footer_height)
    }
  }

  StickyFooter.prototype.init = function() {
    // Create an empty div with the same height as the footer.
    // The empty div will a the necessary space below the content since the real
    // footer will be absolutely positionned. (2)
    this.$footerClone = $('<div/>').height(this.$footer.outerHeight());
    this.$footerClone.insertAfter(this.$footer);
    // Change the original footer to position absolute. (1)
    this.$footer.css({
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    });

    // Do the same for footer-job.
    if (this.$footerJob.length) {
      // (2)
      this.$footerJobClone = $('<div/>').height(this.$footerJob.outerHeight());
      this.$footerJobClone.insertAfter(this.$footerJob);
      // (1)
      this.$footerJob.css({
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: this.$footer.height()
      });
    }

    // Recalculate elements height and position on resize and trigger resize.
    var self = this;
    $(window).resize(function() {self.onResize();});
    $(window).on('orientationchange', function() {self.onResize();});
    this.onResize();
  }

  return StickyFooter;
});
