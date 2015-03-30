$(function(){
	var map;
    
  var mapOptions;
  var lat = 19.005160;
  var lng = -98.204403;
  var marker;
  var geocoder;
  var establecimientos = [];


    $("#form_establecimiento input[name='ubication']").change(function(){
      $("#mapa").append('<div id="loading"></div>');
      $("#loading").show();
      
      geocoder = new google.maps.Geocoder();
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

    function initializePositionManual(posInicio) {
        mapOptions = {
          zoom: 16,
          center: posInicio, 
          mapTypeId: google.maps.MapTypeId.HYBRID
        };

        map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

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


      //formulario de registro negocio
  $("#registrar_negocio_btn").click(function(){
    var proceed = true;
    $("#form_establecimiento input[required=true], #form_establecimiento select[required=true]").each(function(){
      if(!$.trim($(this).val())){ //if this field is empty 
        if ($(this).attr("name") == "lat") {
          $("#form_establecimiento #ubicacion").css({'border-color':'red','border-style':'solid'});
        }
          $(this).css('border-color','red'); //change border color to red   
          proceed = false; //set do not proceed flag
      }
    });
    if (proceed) {

      var registrar = true;
      $("#form_establecimiento input[name='telefono'], #form_establecimiento input[name='celular']").each(function(){
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

          var lat = parseFloat($("#form_establecimiento input[name='lat']").val());
          var lng = parseFloat($("#form_establecimiento input[name='lng']").val());
          var latlng = new google.maps.LatLng(lat, lng);
          
          var data = $('#form_establecimiento').serializeArray();
    
          geocoder.geocode( {'latLng': latlng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              resultados = results[0].address_components;             
             var city = findResult(resultados, "locality");
             var state = findResult(resultados, "administrative_area_level_1");
             var country = findResult(resultados, "country");
             data[data.length] = {name:"ciudad",value:city};
             data[data.length] = {name:"estado",value:state};
             data[data.length] = {name:"pais",value:country};
             console.log(data);
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

  $("#form_establecimiento input").keyup(function(){
    $(this).css('border-color','');
    $("#regEstable #error").hide('slow',function(){
            $("#regEstable #error").empty();
          });
  });

  $("#form_establecimiento select[required=true]").focus(function(){
    $(this).css('border-color','');
  });



  function registroNegocios(datos){

     $.post("php/registroNegocio.php", datos,  function(response) {
              
        
          if(response.type == "error"){ //load json data from server and output message 
            $("#regEstable #error").empty();    
            $("#regEstable #error").append(response.text);
            $("#regEstable #error").show('slow');     
          }else{

            $(window).attr('location', 'index.php');

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
        $(activeTab).fadeIn(); //Fade in the active ID content
        return false;
     });




});