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
	$id_negocio = $_SESSION['id'];
	$latitud = $_POST['lat'];
	$longitud = $_POST['lng'];
	$categoria = $_POST['categoria'];
	$ciudad = $_POST['ciudad'];
	$estado = $_POST['estado'];
	$pais = $_POST['pais'];


			
	//registro de establecimiento
	$query = "UPDATE establecimientos SET nombre='$nombre', direccion='$direccion', tel='$telefono', celular='$celular', lat='$latitud', lng='$longitud', categoria='$categoria', localidad='$ciudad', estado='$estado', pais='$pais' WHERE id_Establecimientos='$id_negocio' ";

	if (mysql_query($query,$dbConect)) {
		echo json_encode(array("type"=>"succes", "text" => "Redireccionando."));	
	}else
		echo json_encode(array("type"=>"error", "text" => "<p>Error al actualizar</p>"));	
		
	
}


?>