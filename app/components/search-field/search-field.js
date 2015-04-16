define(['jquery'], function($){
  'use strict';
  var FOCUS_CLASS = 'is-focused';

  $('.search-field')
    .on('focus.search-field', 'input', function(e) {
      var $icon = $(this).siblings('.search-field-icon');
      $icon.addClass(FOCUS_CLASS)
    })
    .on('blur.search-field', 'input', function(e) {
      var $icon = $(this).siblings('.search-field-icon');
      $icon.removeClass(FOCUS_CLASS)
    });
});
