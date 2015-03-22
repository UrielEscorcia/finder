$(function(){

	var map;
    
    var mapOptions;
    var lat = 19.005160;
    var lng = -98.204403;
    var geocoder;
    var myMarker;
    var markers = [];
    var imgMarker = ["img/icon_restaurant.png","img/icon_bar_2.png","img/icon_hobbie.png"];

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
            myMarker = new google.maps.Marker({
              position: posInicio,
              map: map,
              icon: "img/icon_yourself.png"
            });

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
    
      
      $(".controles #action1 #categories a").click(function(e){
        var findResult = function(results, name){
            var result = $.grep(results, function(obj){
              return obj.types[0] == name && obj.types[1] == "political";
            });
            return result ? result[0].long_name : null;
        };
        var latlng = map.getCenter();
          var datos = { 
                idCategoria: $(this).attr('name'), 
              }
        
        geocoder.geocode( {'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              resultados = results[0].address_components;             
             datos.ciudad = findResult(resultados, "locality");
             datos.estado = findResult(resultados, "administrative_area_level_1");
             datos.pais = findResult(resultados, "country");
             
             mapeoMarkers(datos);
             
            map.setZoom(15);
            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
            
          }
        });
       

      });

    function mapeoMarkers(datos){

       $.ajax({ 
          url: 'php/getEstablecimientos.php',
          data: datos, 
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
            var image = imgMarker[data[i].categoria - 1];
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
    }


//////////////////Campo de busqueda ////////////////

  $(".busqueda #buscarPlace").click(function(){

    if ($(".busqueda #search").val() != '') {
      
      $("#loading").show();
      var address = $(".busqueda #search").val();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          $(".busqueda #search").val(results[0].formatted_address);
          
          map.setZoom(15);
          $("#loading").hide();
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
          $("#loading").hide();
        }
      });
      
    }

  });

  $(".busqueda #geolocalizar").click(function(){
    
    $("#loading").show();
    if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var center = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            map.setCenter(center);
            myMarker.setPosition(center);

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