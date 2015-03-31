
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title>Finder</title>
	<link href="css/login.css" rel='stylesheet' type='text/css' />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<!-- Add mousewheel plugin (this is optional) -->
	<script type="text/javascript" src="js/fancybox/lib/jquery.mousewheel-3.0.6.pack.js"></script>

	<!-- Add fancyBox -->
	<link rel="stylesheet" href="js/fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
	<script type="text/javascript" src="js/fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>

	<script src="js/init.js"></script>
</head>
 
<body>
<div id="registro" class="login-form nuevoSize">

	<form method = "POST" id="form_registro" class="nuevoSizeForm">
		<div id="error"></div>
		<li>
			<input type ="text" name = "nombre"  placeholder = "Escribe tu nombre" required="true"/>
		</li>
		<li>
			<input type="text" name = "apellidos" placeholder = "Apellidos"/>
		</li>
		<li>	
			<input type ="email" name = "email" placeholder = "Correo electronico" required="true"/>
		</li>
		<li>
			<input type ="password" name = "password" placeholder = "Escribe tu contraseña" required="true"/>
		</li>
		<li>
			<input type ="password" name = "re-password" placeholder = "Confirmar contraseña" required="true"/>
		</li>
		<li>	
			<label for="tipo">Tipo Usuario:</label>
			<select name="tipo" required="true">
				<option value="usuario">Usuario</option>
				<option value="dueño">Dueño Establecimeinto</option>
			</select> 
			<input type="date" name = "birthday" required="true"/>
		</li>
		<li>
			<label for="sex">Hombre</label>
			<input type ="radio" name = "sex" value="hombre" />
			<label for="sex">Mujer</label>
			<input type ="radio" name = "sex" value="mujer" />
		</li>
	</form>
	<div class="p-container newp-containerR">
		
		<input type ="submit" id="registrar_btn" value = "Registrar"/>
		<div class="clear"> </div>
	</div>
	
</div>
	
	
</body>
</html>