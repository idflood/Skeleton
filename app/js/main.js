/*jslint browser: true */
/*global require: true, requirejs: true, $: true */

(function(){
    'use strict';

    /*
      This is how you should require a component:
      make sure `mycomponent` in the require-config situated in layout/layout.jade
     */
    /*
      require(['mycomponent'], function () {
          console.log('mycomponent is loaded');
      });
    */

   require([
    'page-navigation',
    'search-field',
    'filter',
    'fullwidth-image',
    'accordion',
    'map',
    'sticky'
  ]);

   // Adds a global placeholder polyfill (ie9).
   require(['jquery', 'placeholder'], function($) {
     $('input, textarea').placeholder();
   });

   require(['equal-height'], function(EqualHeight) {
     new EqualHeight('[data-equal-height]');
   });

   require(['styleguide']);

})();
