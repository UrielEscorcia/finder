$(function(){
	//fomulario de login
	$("#login_btn").click(function(){
		var proceed = true;
		$("#form_login input[required=true]").each(function(){
			if(!$.trim($(this).val())){ //if this field is empty 
			    $(this).css('border-color','red'); //change border color to red   
			        proceed = false; //set do not proceed flag
			    }
		});
		if (proceed) {
			$.post("php/login.php", $("#form_login").serialize(),  function(response) {
							
				
				if(response.type == "error"){ //load json data from server and output message     
					$("#login #error").empty();
					$("#login #error").append(response.text);
					$("#login #error").show('slow');
					$("#form_login input[required=true]").each(function(){
						$(this).css('border-color','red'); //change border color to red   
					});
					$("#form_login #password").val('');			
				}else{
					window.parent.jQuery.fancybox.close();
					$(window.parent).attr('location', 'index.php');

				}
			}, "json");
		
		}else{
			$("#login #error").empty();
			$("#login #error").append("<p>Datos Faltantes.</p>");
			$("#login #error").show('slow');
		}

	});

	$("#form_login input[required=true]").keyup(function(){
		$(this).css('border-color','');
		$("#login #error").hide('slow');
	});

	//formulario de registro usuarios

	$("#registrar_btn").click(function(){
		var proceed = true;
		$("#form_registro input[required=true], #form_registro select[required=true]").each(function(){
			if(!$.trim($(this).val())){ //if this field is empty 
			    $(this).css('border-color','red'); //change border color to red   
			    proceed = false; //set do not proceed flag
			}
		});
		if (proceed) {
			var registrar = true;
			if ($("#form_registro input[name='password']").val() == $("#form_registro input[name='re-password']").val() ) {
				if ($("#form_registro input[name='password']").val().length < 8) {
					
					$("#registro #error").append("<p>La contraseña minimo debe de contener 8 caracteres</p>");
					registrar = false;
				}

			}else{
				
				$("#registro #error").append("<p>Las contraseñas no coinciden</p>");
				registrar = false;
			}

			var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
 
		    //Se utiliza la funcion test() nativa de JavaScript
		    if (!regex.test($("#form_registro input[name='email']").val().trim())) {
		      $("#registro #error").append("<p>Email no valido</p>");
		      registrar = false;
		    }

		    if (registrar) {

		    	$.post("php/regUser.php", $("#form_registro").serialize(),  function(response) {
							
				
					if(response.type == "error"){ //load json data from server and output message     
						$("#registro #error").append(response.text);
						$("#registro #error").show('slow');			
					}else{

						window.parent.jQuery.fancybox.close();
						$(window.parent).attr('location', 'index.php');

					}
				}, "json");

		    }else{
		    	$("#registro #error").show('slow');
		    }

		    
			
		
		}else{
			$("#registro #error").append("<p>Datos Faltantes.</p>");
			$("#registro #error").show('slow');
		}

	});

	$("#form_registro input[required=true]").keyup(function(){
		$(this).css('border-color','');
		$("#registro #error").hide('slow',function(){
		    		$("#registro #error").empty();
		    	});
	});

	$("#form_registro input[name='birthday']").focus(function(){
		$(this).css('border-color','');
	});

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

		    	$.post("php/registroNegocio.php", $("#form_establecimiento").serialize(),  function(response) {
							
				
					if(response.type == "error"){ //load json data from server and output message 
						$("#regEstable #error").empty();    
						$("#regEstable #error").append(response.text);
						$("#regEstable #error").show('slow');			
					}else{

						$(window).attr('location', 'index.php');

					}
				}, "json");

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

	//menu dropdown en index

	//Hide SubLevel Menus
	 $('.controles ul li ul').hide();
	 
	 //onClick Show SubLevel Menus
	 $('.controles ul li #categorias').click(
	  
	  function(event){
	  		
	  	event.stopPropagation();	
	  	//Remove the Border
		$('ul li.arrow', '#action1').css('border-bottom', '0');
		
		if ($('ul', '#action1').css('display') == 'none')
			$('ul', '#action1').slideDown();
		else
			$('ul', '#action1').slideUp();
	  
		//Hide Other Menus
		$('.controles ul li ul').not($('ul', '#action1')).slideUp();
		 
		 
		   
	  });

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

    //fancybox
    $(".various").fancybox({
    	openEffect	: 'fade',
		closeEffect	: 'fade	'
    });

});





