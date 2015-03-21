$(function(){

	var map;
    
    var mapOptions;
    var lat = 19.005160;
    var lng = -98.204403;
    var geocoder;

    function initialize() {
      geocoder = new google.maps.Geocoder();
        mapOptions = {
          zoom: 15,
          scrollwheel: false,
          disableDefaultUI: true,
           styles: [{
                  featureType: 'water',
                  stylers: [{
                      color: '#46bcec'
                  }, {
                      visibility: 'on'
                  }]
              }, {
                  featureType: 'landscape',
                  stylers: [{
                      color: '#f2f2f2'
                  }]
              }, {
                  featureType: 'road',
                  stylers: [{
                      saturation: -100
                  }, {
                      lightness: 45
                  }]
              }, {
                  featureType: 'road.highway',
                  stylers: [{
                      visibility: 'simplified'
                  }]
              }, {
                  featureType: 'road.arterial',
                  elementType: 'labels.icon',
                  stylers: [{
                      visibility: 'off'
                  }]
              }, {
                  featureType: 'administrative',
                  elementType: 'labels.text.fill',
                  stylers: [{
                      color: '#444444'
                  }]
              }, {
                  featureType: 'transit',
                  stylers: [{
                      visibility: 'off'
                  }]
              }, {
                  featureType: 'poi',
                  stylers: [{
                      visibility: 'off'
                  }]
              }] 
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            posInicio = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            map.setCenter(posInicio);
            $("#loading").hide();
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


      //posicionar marcadores segun categoria
      var markers = [];

      $(".controles #action1 #categories a").click(function(e){
        $.ajax({ 
          url: 'php/getEstablecimientos.php', 
          data: 'idCategoria=' + $(this).attr('name'), 
          dataType: 'json', 
        }).done(function(data){
          
          if (markers.length != 0) { //delete markers
            for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
            }
            markers = [];
          }

          for (var i = 0; i < data.length; i++) {
            var posMarker = new google.maps.LatLng(parseFloat(data[i].lat), parseFloat(data[i].lng));
            var image = 'img/marker 2.png';
            var marker = new google.maps.Marker({
              position: posMarker,
              map: map,
              icon: image
            });

            marker.info = new google.maps.InfoWindow({
              content: '<b>Nombre:</b> ' + data[i].nombre + '<br> <b>Direccion:</b> ' + data[i].direccion + '<br> <b>Telefono:</b> ' + data[i].tel + '<br><b>Celular:</b> ' + data[i].celular + '<br>'
            });

            marker.info.open(map, marker);

            markers.push(marker);
            

          }
          
          /*for (var i = 0; i < markers.length; i++) {
            google.maps.event.addListener(markers[i], 'click', function() {
              markers[i].info.open(map, markers[i]);
            });
            
          }*/
          
          
        });

      });


//////////////////Campo de busqueda ////////////////

  $(".busqueda #buscarPlace").click(function(){

    if ($(".busqueda #search").val() != '') {
      $("#loading").show();
      var address = $(".busqueda #search").val();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
          $("#loading").hide();
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          $("#loading").hide();
        }
      });
      $(".busqueda #search").val('');
    }

  });

  $(".busqueda #geolocalizar").click(function(){
    
    $("#loading").show();
    if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var center = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            map.setCenter(center);
            $("#loading").hide();
          
          }, function() {
            handleNoGeolocation(true);
          });
        } else {
          // Browser doesn't support Geolocation
          handleNoGeolocation(false);
        }
     });

});