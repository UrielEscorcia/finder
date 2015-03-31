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
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<!-- Add mousewheel plugin (this is optional) -->
	<script type="text/javascript" src="js/fancybox/lib/jquery.mousewheel-3.0.6.pack.js"></script>

	<!-- Add fancyBox -->
	<link rel="stylesheet" href="js/fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
	<script type="text/javascript" src="js/fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>
	
	<script src="js/mapaEstablecimineto.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
</head>
 
<body id="bodyEstable">

	<nav class ="navbar">
		<div class="menu">
			<a class="sitename" href="index.php">Finder</a>
			<ul class="menu-items">
				
				<li class="busqueda" style="display:none;">
					<input type ="search" name = "search" id="search" placeholder = "Buscar"/>
					<a id="buscarPlace" href="#"><img src="img/lupa2.png"></a>
					<a id="geolocalizar" href="#"><img src="img/loc.png"></a>
				</li>
				<li class="controles">
					<ul>
					<li id="action1">
						<a href="#tab1" id="" class="tabNegocio">Establecimeintos</a>
						<a href="#tab2" id="" class="tabNew">Agregar nuevo</a>
					</li>
					<li id="action2">
						<a href="#" id="acionesUsr"><img src="img/usr.png"><?php echo $arrayUser['nombre']; ?></a>
						<ul id="actions">
							<li class="arrow">arrow</li>
							<?php
								if (!empty($arrayUser)) {
									
									echo '<li><a href="index.php?salir=true">Salir</a></li>';
								}else{
									echo '<li><a class="various" data-fancybox-type="iframe" href="login.html">Login</a></li>';
									echo '<li><a class="signinLight" data-fancybox-type="iframe" href="registro.php">Sign in</a></li>';;
								}
								

							?>
			
						</ul>
					</li>
					</ul>
				</li>

			</ul>
		</div>
			
				
		</nav>

		<div class="content">
			<div class="tab_container" name="<?php echo $_SESSION['id_Usr']; ?>">
				 <div id="tab1" class="tab_content">
        			<div class="listaNegocio">
        				<ul class="lista">
							
						</ul>
        			</div>
        			<div class="datosNegocios">
        				<div class="data">
        					<div id="error"></div>
        					<form method = "POST" id="form_establecimiento">
								<div class="titulo">
									<input type ="text" name = "nombre"  placeholder = "Nombre del establecimiento" required="true"/>
								</div>
								
								<input type="text" name = "direccion" placeholder = "Direccion establecimiento" required = "true"	/>
								
								<select name="categoria" required="true" >
										<option value="">Categoria</option>
										<?php 
											foreach ($arrayCategoria as $categoria) {
												echo '<option value ="'.$categoria['id_Categorias'].'">'.$categoria['nombreCategoria'].'</option>' ;
											}
										 ?>
								</select> 
								<input type ="text" name = "telefono" placeholder = "Número telefonico" />
								<input type ="text" name = "celular" placeholder = "Número celular" />
								<input type ="hidden" name = "lat" placeholder = "Latitud" required="true" />
								<input type ="hidden" name = "lng" placeholder = "Longitud" required="true" />
								<input type ="hidden" name = "id"  />
								
								
							</form>
        				</div>
        				<div id="maps" class="mapa">
        					
        				</div>
        				<div class="submitReg">
							<input type ="submit" id="update_negocio_btn" value = "Actualizar"/>
						</div>
        				
        			</div>
			    </div>
			    <div id="tab2" class="tab_content">
			       <!-- registro establecimiento -->
					<div id="regEstable" class="formularioAltas">
				 	
						
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
							</select> 
							<input type ="hidden" name = "lat" placeholder = "Latitud" required="true" />
							<input type ="hidden" name = "lng" placeholder = "Longitud" required="true" />
							
							<div id="ubicacion">
								<label from = "ubication">Estoy en mi negocio <input type ="radio" name = "ubication" value= "true" /></label>
								
								<label from = "ubication1">Elegir ubicacion manual <input type ="radio" name = "ubication" value="false" /></label>
								
							</div>
							
						</form>
						<div class="submitReg">
							<input type ="submit" id="registrar_negocio_btn" value = "Registrar"/>
						</div>
					</div>
        			<div id="mapa">
        				
        			</div>
			    </div>

			</div>
			
		</div>
 	

	
	<!-- mapa -->
	
	
	
	
</body>
</html>