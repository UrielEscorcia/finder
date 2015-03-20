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
	<script src="js/mapa.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
 
<body>
	<div id="map-canvas">
	</div>
		
		<nav class ="navbar">
		<div class="menu">
			<a class="sitename" href="">Finder</a>
			<ul class="menu-items">
				
				<li class="busqueda">
					<input type ="text" name = "search" id="search" placeholder = "Buscar"/>
					<a href="#"><img src="img/lupa2.png"></a>
				</li>
				<li class="controles">
					<ul>
					<li id="action1">
						<a href="#" id="categorias"><img src="img/btn1.png"></a>
						<ul id="categories">
							<li class="arrow">arrow</li>
							<?php 
								foreach ($arrayCategoria as $categoria) {
									echo '<li><a href="#" name ="'.$categoria['id_Categorias'].'">'.$categoria['nombreCategoria'].'</a></li>' ;
								}
							 ?>
						</ul>
					</li>
					<li id="action2">
						<a href="#" id="acionesUsr"><img src="img/usr.png"></a>
						<ul id="actions">
							<li class="arrow">arrow</li>
							<?php
								if (!empty($arrayUser)) {
									if ($arrayUser['tipo'] == "dueño") {
										echo '<li><a href="establecimiento.php">Establecimientos</a></li>';
									}
									echo '<li><a href="index.php?salir=true">Salir</a></li>';
								}else{
									echo '<li><a href="login.html">Login</a></li>';
									echo '<li><a href="registro.php">Sign in</a></li>';;
								}
								

							?>
			
						</ul>
					</li>
					</ul>
				</li>

			</ul>
		</div>
			
				
		</nav>	

				
	
</body>
</html>