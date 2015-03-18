$(function(){
	var map;
    
  var mapOptions;
  var lat = 19.005160;
  var lng = -98.204403;
  var marker;


    $("#form_establecimiento input[name='ubication']").change(function(){
      $("#form_establecimiento #ubicacion").css({'border-color':'','border-style':''});
      if ($(this).val() == "true") { //geolocalizacion negocio automatica
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              $("#form_establecimiento input[name='lat']").val(position.coords.latitude);
              $("#form_establecimiento input[name='lng']").val(position.coords.longitude);
              posInicio = new google.maps.LatLng(position.coords.latitude,
                                               position.coords.longitude);

              initialize(posInicio);
            }, function() {
              handleNoGeolocation(true);
            });
          } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
          }
        
      }else{ //posicionamiento manual
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              posInicio = new google.maps.LatLng(position.coords.latitude,
                                               position.coords.longitude);

              initializePositionManual(posInicio);
            }, function() {
              handleNoGeolocation(true);
            });
        }
      }  
      
    });


    function initialize(posInicio) {
        mapOptions = {
          zoom: 18,
          center: posInicio,
          mapTypeId: google.maps.MapTypeId.HYBRID
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var infowindow = new google.maps.InfoWindow({
                map: map,
                position: posInicio,
                content: 'Tu negocio esta aqui.'
              });
      
    }

    function initializePositionManual(posInicio) {
        mapOptions = {
          zoom: 16,
          center: posInicio, 
          mapTypeId: google.maps.MapTypeId.HYBRID
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var infowindow = new google.maps.InfoWindow({
                content: 'Arrastra el marcador y posicionalo en donde se encuentra tu negocio.'
              });

        marker = new google.maps.Marker({
          position: posInicio,
          map: map,
          draggable: true,
          title:"Negocio"
        });

        infowindow.open(map,marker);

        google.maps.event.addListener(marker, "dragend", function() { 
          $("#form_establecimiento input[name='lat']").val(marker.getPosition().lat());
          $("#form_establecimiento input[name='lng']").val(marker.getPosition().lng());
          map.setCenter(marker.getPosition());
        }); 
      
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




});