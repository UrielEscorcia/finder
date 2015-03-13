$(function(){
	var map;
    
    var mapOptions;
    var lat = 19.005160;
    var lng = -98.204403;

    function initialize() {
        mapOptions = {
          zoom: 15 
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            posInicio = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            var infowindow = new google.maps.InfoWindow({
              map: map,
              position: posInicio,
              content: 'Tu estas aqui.'
            });

            map.setCenter(posInicio);
          }, function() {
            handleNoGeolocation(true);
          });
        } else {
          // Browser doesn't support Geolocation
          handleNoGeolocation(false);
        }
        
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
          var content = 'Error: Your browser doesn\'t support geolocation.';
        }

        posInicio = new google.maps.LatLng(lat, lng); 

        var options = {
          map: map,
          position: posInicio,
          content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
      }

      google.maps.event.addDomListener(window, 'load', initialize);



});