
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<title>Finder</title>
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="js/init.js"></script>
</head>
 
<body>
<div id="registro" >
 	
	<h2>Registro</h2>
	<div id="error"></div>

	<form method = "POST" id="form_registro">
		<label for="nombre">Nombre:</label>
		<input type ="text" name = "nombre"  placeholder = "Escribe tu nombre" required="true"/><br><br>
		<label for="apellidos">Apellidos:</label>
		<input type="text" name = "apellidos" placeholder = "Apellidos"/><br><br>
		<label for="email">Email:</label>
		<input type ="email" name = "email" placeholder = "Correo electronico" required="true"/><br><br>
		<label for="password">Contraseña:</label>
		<input type ="password" name = "password" placeholder = "Escribe tu contraseña" required="true"/><br><br>
		<label for="re-password">Repite Contraseña:</label>
		<input type ="password" name = "re-password" placeholder = "Confirmar contraseña" required="true"/><br><br>
		<label for="birthday">Fecha de nacimiento:</label>
		<input type="date" name = "birthday" required="true"/><br><br>
		<label for="tipo">Tipo Usuario:</label>
		<select name="tipo" required="true">
			<option value="usuario">Usuario</option>
			<option value="dueño">Dueño Establecimeinto</option>
		</select> <br><br>
		<input type ="radio" name = "sex" value="mujer" />
		<label for="sex">Mujer</label><br><br>
		<input type ="radio" name = "sex" value="hombre" />
		<label for="sex">Hombre</label><br><br>
	</form>
	<input type ="submit" id="registrar_btn" value = "Registrar"/><br><br>
</div>
	
	
</body>
</html>