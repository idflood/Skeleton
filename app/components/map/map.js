define(['jquery'], function($){
  'use strict';
  var $googleMap = $('[data-map]');

  // Directly use the path from pin.svg so that we can dynamically set the fill and zoom option.
  var makerSvgPath = "M5-.016c-.703 0-1.354.137-1.953.41-.599.273-1.133.632-1.602 1.074-.443.443-.794.97-1.055 1.582-.26.612-.391 1.257-.391 1.934 0 2.396.833 4.831 2.5 7.305l2.5 3.711 2.5-3.711c1.667-2.474 2.5-4.909 2.5-7.305 0-.677-.13-1.322-.391-1.934-.26-.612-.612-1.139-1.055-1.582-.469-.443-1.003-.801-1.602-1.074-.599-.273-1.25-.41-1.953-.41zm0 7.773c-.365 0-.71-.072-1.035-.215-.326-.143-.618-.332-.879-.566-.234-.26-.423-.553-.566-.879-.143-.326-.215-.671-.215-1.035 0-.365.072-.716.215-1.055.143-.339.332-.625.566-.859.26-.234.553-.423.879-.566.326-.143.671-.215 1.035-.215.365 0 .71.072 1.035.215.326.143.618.332.879.566.234.234.423.521.566.859.143.339.215.69.215 1.055s-.072.71-.215 1.035c-.143.326-.332.618-.566.879-.26.234-.553.423-.879.566-.326.143-.671.215-1.035.215z";

  var googleMapLoaded = function () {
    $googleMap.each(function() {
      var $this = $(this);

      // Center on Switzerland by default.
      var map_center = new google.maps.LatLng(46.6667767,8.1021001);

      // Set the center if the option is defined.
      if ($this.data('map-lat') && $this.data('map-lng')) {
        map_center = new google.maps.LatLng($this.data('map-lat'), $this.data('map-lng'));
      }

      var mapOptions = {
        zoom: $this.data('map-zoom') || 8,
        center: map_center,
        scrollwheel: false, // Disable the scrollwhell zoom so that we can scroll the page.
        disableDefaultUI: true
      };

      // If the device has touch we disable the drag option.
      // Otherwhise if we are on mobile and the map take the full screen it become
      // impossible to scroll through the page.
      if ($('html').hasClass("touch")) {
        mapOptions.draggable = false;
      }

      // Create the map.
      var map = new google.maps.Map($this.get(0), mapOptions);

      // Check for possible gmap-item markers.
      var $gmapItem = $('[data-map-item]');

      var icon = {
        path: makerSvgPath,
        fillColor: '#DC2856',
        fillOpacity: 1,
        anchor: new google.maps.Point(4,17),
        strokeWeight: 0,
        scale: 1.5
      };

      $gmapItem.each(function() {
        var $el = $(this);
        var position = new google.maps.LatLng($el.data('map-lat'), $el.data('map-lng'));
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: icon
        });
      });

      // Keep map centered on resize.
      var centerMap = function() {
        map.setCenter(map_center);
      };
      google.maps.event.addDomListener(window, 'resize', centerMap);
    });
  };

  // Load google map js api asyncronously only if there is a map on the page.
  if ($googleMap.length) {
    // Define a callback called automatically by the google map api.
    window.googleMapLoaded = googleMapLoaded;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=googleMapLoaded';
    document.body.appendChild(script);
  }
});
