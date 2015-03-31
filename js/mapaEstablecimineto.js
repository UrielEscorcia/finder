$(function(){
	var map;
    
  var mapOptions;
  var lat = 19.005160;
  var lng = -98.204403;
  var marker;
  var geocoder = new google.maps.Geocoder();
  var establecimientos = [];



    $("#form_establecimiento input[name='ubication']").change(function(){
      map = null;
      $("#maps").empty();
      $('#tab1 .datosNegocios').hide();
      $("#update_negocio_btn").hide();
      $("#mapa").append('<div id="loading"></div>');
      $("#loading").show();
      
      $("#form_establecimiento #ubicacion").css({'border-color':'','border-style':''});
      if ($(this).val() == "true") { //geolocalizacion negocio automatica
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              $("#form_establecimiento input[name='lat']").val(position.coords.latitude);
              $("#form_establecimiento input[name='lng']").val(position.coords.longitude);
              posInicio = new google.maps.LatLng(position.coords.latitude,
                                               position.coords.longitude);

              initialize(posInicio);
              $(".menu-items .busqueda").hide();
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
              $(".menu-items .busqueda").show();
             initializePositionManual(posInicio, document.getElementById('mapa'));

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
          mapTypeId: google.maps.MapTypeId.HYBRID,
          scrollwheel: false,
          
        };

        map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

        var infowindow = new google.maps.InfoWindow({
                map: map,
                position: posInicio,
                content: 'Tu negocio esta aqui.'
              });

        $("#loading").hide();
      
    }

    function initializePositionManual(posInicio, element) {
        mapOptions = {
          zoom: 16,
          center: posInicio, 
          mapTypeId: google.maps.MapTypeId.HYBRID
        };

        map = new google.maps.Map(element, mapOptions);

        var infowindow = new google.maps.InfoWindow({
                content: 'Arrastra el marcador y posicionalo en donde se encuentra tu negocio.'
              });

        marker = new google.maps.Marker({
          position: posInicio,
          map: map,
          draggable: true,
          title:"Negocio"
        });
        $("#loading").hide();

        infowindow.open(map,marker);

        google.maps.event.addListener(marker, "dragend", function() { 
          $("#form_establecimiento input[name='lat']").val(marker.getPosition().lat());
          $("#form_establecimiento input[name='lng']").val(marker.getPosition().lng());
          if ($("#update_negocio_btn").css('display') == 'none') 
            $("#update_negocio_btn").show();

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


      //formulario de registro negocio border: 1px solid red;
  $("#registrar_negocio_btn").click(function(){
    var proceed = true;
    $("#regEstable #form_establecimiento input[required=true], #regEstable #form_establecimiento select[required=true]").each(function(){
      if(!$.trim($(this).val())){ //if this field is empty 
        if ($(this).attr("name") == "lat") {
          $("#regEstable #form_establecimiento #ubicacion").css({'border':'2px solid #9D1526'});
        }
          $(this).css('border','2px solid #9D1526'); //change border color to red   
          proceed = false; //set do not proceed flag
      }
    });
    if (proceed) {

      var registrar = true;
      $("#regEstable #form_establecimiento input[name='telefono'], #regEstable #form_establecimiento input[name='celular']").each(function(){
        if ($(this).val().length > 0 ) {
          if (isNaN($(this).val())) {
            $("#regEstable #error").append("<p>El campo de "+$(this).attr("name")+ " solo acepta numeros</p>");
              registrar = false;
          }else{
            if ($(this).val().length != 10) {
            
              $("#regEstable #error").append("<p>El numero de "+$(this).attr("name")+" debe de contener 10 caracteres</p>");
              registrar = false;
            }
          }
        }
        
      });


        if (registrar) {
          var findResult = function(results, name){
            var result = $.grep(results, function(obj){
              return obj.types[0] == name && obj.types[1] == "political";
            });
            return result ? result[0].long_name : null;
          };

          var lat = parseFloat($("#regEstable #form_establecimiento input[name='lat']").val());
          var lng = parseFloat($("#regEstable #form_establecimiento input[name='lng']").val());
          var latlng = new google.maps.LatLng(lat, lng);
          
          var data = $('#regEstable #form_establecimiento').serializeArray();
    
          geocoder.geocode( {'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              resultados = results[0].address_components;             
             var city = findResult(resultados, "locality");
             var state = findResult(resultados, "administrative_area_level_1");
             var country = findResult(resultados, "country");
             data[data.length] = {name:"ciudad",value:city};
             data[data.length] = {name:"estado",value:state};
             data[data.length] = {name:"pais",value:country};
             registroNegocios(data);
             
            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
            
          }
        });

        }else{
          $("#regEstable #error").show('slow');
        }

        
      
    
    }else{
      $("#regEstable #error").append("<p>Datos Faltantes.</p>");
      $("#regEstable #error").show('slow');
    }

  });

  $("#regEstable #form_establecimiento input").keyup(function(){
    $(this).css('border','');
    $("#regEstable #error").hide('slow',function(){
            $("#regEstable #error").empty();
          });
  });

  $("#regEstable #form_establecimiento select[required=true]").focus(function(){
    $(this).css('border','');
    $("#regEstable #error").hide('slow',function(){
            $("#regEstable #error").empty();
          });
  });



  function registroNegocios(datos){

     $.post("php/registroNegocio.php", datos,  function(response) {
              
        
          if(response.type == "error"){ //load json data from server and output message 
            $("#regEstable #error").empty();    
            $("#regEstable #error").append(response.text);
            $("#regEstable #error").show('slow');     
          }else{

            $(window).attr('location', 'establecimiento.php');

          }
        }, "json");
  }

  //Hide SubLevel Menus
   $('.controles ul li ul').hide();

  $('.controles ul li #acionesUsr').click(
    
    function(event){
      event.stopPropagation();
      //Remove the Border
    $('ul li.arrow', '#action2').css('border-bottom', '0');
       
    if ($('ul', '#action2').css('display') == 'none')
      $('ul', '#action2').slideDown();
    else
      $('ul', '#action2').slideUp();
        
    //Hide Other Menus
    $('.controles ul li ul').not($('ul', '#action2')).slideUp();
     
       
    });

   //hide menus
  $(document).mousedown( function(){
      $('ul', '#action2').slideUp();
      $('ul', '#action1').slideUp();
    });


    //get lista negocios por dueño

    getNegocios($(".tab_container").attr('name'));

    function getNegocios(id_user){
      
      $.ajax({ 
          url: 'php/getNegociosbyUser.php',
          data: {datos:id_user}, 
          dataType: 'json', 
        }).done(function(data){

       
          if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {

              var datos = '<h4>'+data[i].nombre;
              var imgDiv = '<img src="img/estable.png"><a id="rute" name="'+i+'" href="#">Ver</a><a id="ver" name="'+i+'" href="#">Borra</a>';

              $(".listaNegocio .lista").append('<li class="item" name="'+data[i].id_Establecimientos+'"><div class="container"></div></li>');
              $(".listaNegocio .lista li:last-child .container").append('<div class="datos"></div>');
              $(".listaNegocio .lista li:last-child .container .datos").append(datos);
              $(".listaNegocio .lista li:last-child .container").append('<div class="img"></div>');
              $(".listaNegocio .lista li:last-child .container .img").append(imgDiv);

              establecimientos.push(data[i]);
            }
            //llenado de form para update
             $(".img #rute").click(function(){
                map = null;
                $("#update_negocio_btn").hide();
                $("#mapa").empty();
                $("#mapa").css('background','white');
                $( "#regEstable #form_establecimiento input[name='ubication']" ).prop( "checked", false );
                $('#tab1 .datosNegocios').show();
                var index = parseInt($(this).attr('name'));
                $(".data #form_establecimiento input[name='nombre']").val(establecimientos[index].nombre);
                $(".data #form_establecimiento input[name='direccion']").val(establecimientos[index].direccion);
                $(".data #form_establecimiento input[name='telefono']").val('Tel:'+establecimientos[index].tel);
                $(".data #form_establecimiento input[name='celular']").val('Cel:'+establecimientos[index].celular);
                $(".data #form_establecimiento input[name='lat']").val(establecimientos[index].lat);
                $(".data #form_establecimiento input[name='lng']").val(establecimientos[index].lng);
                $(".data #form_establecimiento select").val(establecimientos[index].categoria);
                $(".data #form_establecimiento input[name='id']").val(establecimientos[index].id_Establecimientos);

                var position = new google.maps.LatLng(parseFloat(establecimientos[index].lat), parseFloat(establecimientos[index].lng));
                $("#maps").append('<div id="loading"></div>');
                $("#loading").show();
                initializePositionManual(position, document.getElementById('maps'));

            });
             //borrado de negocios
             $(".img #ver").click(function(){
                var index = parseInt($(this).attr('name'));
                 var retVal = confirm("De verdad deseas borrar el Establecimiento de la base de datos?");
                 if( retVal == true ){
                    $.ajax({
                      type:'POST',
                      url:'php/deleteNegocio.php',
                      data:'delete_id='+establecimientos[index].id_Establecimientos,
                      success:function(data) {
                        if(data) {  
                          if (data.type != "error") {
                            $('#tab1 .datosNegocios').hide();
                            $(".listaNegocio .lista").empty();
                            getNegocios($(".tab_container").attr('name'));

                          }
                        } 
                      }
                   });
                  return true;
                 }else{
                    console.log("no se borra nada");
                  return false;
                 }
                

            });
          }
          
        });
    }

    //navegacion 
     //When page loads...
     $(".tab_content").hide(); //Hide all content
     
     $(".tab_content:first").show(); //Show first tab content
     
     //On Click Event
     $("#action1 a").click(function() {
    
        $(".tab_content").hide(); //Hide all tab content
       
        var activeTab = $(this).attr("href"); //Find the href attribute value to identify the active tab + content

        if (activeTab == "#tab1") {
          $(".menu-items .busqueda").hide();
        }

        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
     });


     //update negocios 
      $("#update_negocio_btn").click(function(){
      var proceed = true;
      $(".datosNegocios #form_establecimiento input[required=true], .datosNegocios #form_establecimiento select[required=true]").each(function(){
        if(!$.trim($(this).val())){ //if this field is empty 
          if ($(this).attr("name") == "lat") {
            $(".datosNegocios #form_establecimiento #ubicacion").css({'border':'2px solid #9D1526'});
          }
            $(this).css('border','2px solid #9D1526'); //change border color to red   
            proceed = false; //set do not proceed flag
        }
      });
      if (proceed) {
        var registrar = true;
        $(".datosNegocios #form_establecimiento input[name='telefono'], .datosNegocios #form_establecimiento input[name='celular']").each(function(){
          var cadena = $(this).val().split(":");
          $(this).val(cadena[1]);

          if ($(this).val().length > 0 ) {
            
            if (isNaN($(this).val())) {
              $(".datosNegocios #error").append("<p>El campo de "+$(this).attr("name")+ " solo acepta numeros</p>");
                registrar = false;
            }else{
              if ($(this).val().length != 10) {
              
                $(".datosNegocios #error").append("<p>El numero de "+$(this).attr("name")+" debe de contener 10 caracteres</p>");
                registrar = false;
              }
            }
          }
          
        });


        if (registrar) {
          console.log("brinca");
          var findResult = function(results, name){
            var result = $.grep(results, function(obj){
              return obj.types[0] == name && obj.types[1] == "political";
            });
            return result ? result[0].long_name : null;
          };

          var lat = parseFloat($(".datosNegocios #form_establecimiento input[name='lat']").val());
          var lng = parseFloat($(".datosNegocios #form_establecimiento input[name='lng']").val());
          var latlng = new google.maps.LatLng(lat, lng);
          
          var data = $('.datosNegocios #form_establecimiento').serializeArray();
    
          geocoder.geocode( {'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              resultados = results[0].address_components;             
             var city = findResult(resultados, "locality");
             var state = findResult(resultados, "administrative_area_level_1");
             var country = findResult(resultados, "country");
             data[data.length] = {name:"ciudad",value:city};
             data[data.length] = {name:"estado",value:state};
             data[data.length] = {name:"pais",value:country};
             
             updateNegocios(data);
             
            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
            
          }
        });

        }else{
          $(".datosNegocios #error").show('slow');
        }

        
      
    
    }else{
      $(".datosNegocios #error").append("<p>Datos Faltantes.</p>");
      $(".datosNegocios #error").show('slow');
    }

  });

  $(".datosNegocios #form_establecimiento input").keyup(function(){
    $(this).css('border','');
    $("#update_negocio_btn").show();
    $(".datosNegocios #error").hide('slow',function(){
            $(".datosNegocios #error").empty();
          });
  });


  $(".datosNegocios #form_establecimiento select[required=true]").focus(function(){
    $(this).css('border','');
    $("#update_negocio_btn").show();
    $(".datosNegocios #error").hide('slow',function(){
            $(".datosNegocios #error").empty();
          });
  });


  function updateNegocios(datos){
     $.post("php/updateNegocio.php", datos,  function(response) {
              
        
          if(response.type == "error"){ //load json data from server and output message 
            $("#error").empty();    
            $("#error").append(response.text);
            $("#error").show('slow');     
          }else{

            $(window).attr('location', 'establecimiento.php');
            console.log("accion realizada");

          }
        }, "json");
  }

//////////////////Campo de busqueda ////////////////

  $(".busqueda #buscarPlace").click(function(){

    if ($(".busqueda #search").val() != '') {
      
      
      
      
      var address = $(".busqueda #search").val();
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
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
    
    
    
    
    if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var center = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);

            map.setCenter(center);
            marker.setPosition(center);
            map.setZoom(15);

            
            
            $(".busqueda #search").val('');
          
          }, function() {
            handleNoGeolocation(true);
          });
        } else {
          // Browser doesn't support Geolocation
          handleNoGeolocation(false);
        }
     });



});