<?php
	
	//iniciamos sesiones
	session_start();
	//archivos necesarios
	require_once 'php/conexion.php';
	//variable de coneccion con db
	$dbConect = conectarBD();
	mysql_set_charset("utf8",$dbConect);
	//cerrar sesion
	if (!empty($_GET['salir'])) {
		//borramos y destruimos tdo tipo de sesion
		session_unset();
		session_destroy();
	}
	//verificamos que este conectado el usuario
	if (!empty($_SESSION['user']) && !empty($_SESSION['id_Usr'])) {
		$id_user = $_SESSION['id_Usr'];
		$query = "SELECT * FROM usuarios WHERE id_Usuarios = '$id_user'";
		$result = mysql_query($query,$dbConect);
		$arrayUser = mysql_fetch_array($result);
		if ($arrayUser['tipo'] != "dueño") {
			header('Location: index.php');
			die();
		}
	}else{
		header('Location: login.html');
	}

	//cargar de categorias
	$arrayCategoria = array();
	$query = "SELECT * FROM categorias";
	$result = mysql_query($query, $dbConect);
	while ($row = mysql_fetch_assoc($result)) {
		array_push($arrayCategoria, $row);
	}
?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Finder</title>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=false"></script>
	<script src="js/jquery-1.11.2.min.js"></script>
	<script src="js/init.js"></script>
	<script src="js/mapaEstablecimineto.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
</head>
 
<body>
 	
<?php
	echo "<h2>Hola ".$arrayUser['nombre']."</h2>";
	echo $_SESSION['user'];
	
?>
	<a href="index.php?salir=true">Salir</a>
	<!-- registro establecimiento -->
	<div id="regEstable" >
 	
		<h2>Registrar Establecimiento</h2>
		<div id="error"></div>
		<form method = "POST" id="form_establecimiento">
			
			<input type ="text" name = "nombre"  placeholder = "Nombre del establecimiento" required="true"/><br><br>
			
			<input type="text" name = "direccion" placeholder = "Direccion establecimiento" required = "true"/><br><br>
			
			<input type ="text" name = "telefono" placeholder = "Número telefonico" /><br><br>
			<input type ="text" name = "celular" placeholder = "Número celular" /><br><br> 
			
			<select name="categoria" required="true" >
					<option value="">Categoria</option>
					<?php 
						foreach ($arrayCategoria as $categoria) {
							echo '<option value ="'.$categoria['id_Categorias'].'">'.$categoria['nombreCategoria'].'</option>' ;
						}
					 ?>
			</select> <br><br>
			<input type ="text" name = "lat" placeholder = "Latitud" required="true" />
			<input type ="text" name = "lng" placeholder = "Longitud" required="true" />
			<br><br>
			<div id="ubicacion">
				<label from = "ubication">Estoy en mi negocio</label>
				<input type ="radio" name = "ubication" value= "true" />
				<label from = "ubication1">Elegir ubicacion manual</label>
				<input type ="radio" name = "ubication" value="false" />
			</div>
			
		</form>
		<input type ="submit" id="registrar_negocio_btn" value = "Registrar"/><br><br>
	</div>
	<!-- mapa -->
	<div id="map-canvas"></div>
	
	
	
</body>
</html>