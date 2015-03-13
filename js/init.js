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

					$(window).attr('location', 'home.php');

				}
			}, 	);
		
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

	//formulario de registro
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

						$(window).attr('location', 'home.php');

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


});




var obj= {
	elemento={
		x=1,
		y=2,
		nombre = "objeto1",
	},
	elemento2 ={
		x=4,
		y=65,
		nombre = "objeto2",
	}
 }





