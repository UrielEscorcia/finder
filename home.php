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
	}else{
		header('Location: index.html');
		die();
	}

?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Finder</title>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
	<script src="js/jquery-1.11.2.min.js"></script>
	<script src="js/init.js"></script>
	<script src="js/mapa.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
 
<body>
 	
<?php

	echo "<h2>Hola ".$arrayUser['nombre']."</h2>";

	if ($arrayUser['tipo'] == "dueño") {
		 echo '<a href="establecimiento.php">Registrar establecimiento</a>';
	}
	

?>
	<a href="home.php?salir=true">Salir</a>
	<div id="map-canvas"></div>
	
	
	
</body>
</html>