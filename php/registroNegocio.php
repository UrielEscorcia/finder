<?php
//iniciamos sesiones
session_start();

//archivos necesarios
require_once 'conexion.php';

//variable de coneccion con db
$dbConect = conectarBD();
mysql_set_charset("utf8",$dbConect);

//si el formulario se envio
if ($_POST) {
	$nombre = $_POST['nombre'];
	$direccion = $_POST['direccion'];
	$telefono = $_POST['telefono'];
	$celular = $_POST['celular'];
	$propietario = $_SESSION['id_Usr'];
	$latitud = $_POST['lat'];
	$longitud = $_POST['lng'];
	$categoria = $_POST['categoria'];
			
	//registro de establecimiento
	$query = "INSERT INTO establecimientos (nombre,direccion,tel,celular,propietario,lat,lng,categoria) VALUES ('$nombre','$direccion','$telefono','$celular','$propietario','$latitud','$longitud','$categoria')";
	if (mysql_query($query,$dbConect)) {
		echo json_encode(array("type"=>"succes", "text" => "Redireccionando."));	
	}else
		echo json_encode(array("type"=>"error", "text" => "<p>Error al registrar</p>"));	
		
	
}


?>