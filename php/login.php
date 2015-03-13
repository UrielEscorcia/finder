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

	//definimos variables
	if (!empty($_POST['email']))
		$email = $_POST['email'];
	if (!empty($_POST['password']))
		$password = $_POST['password'];

	$query = "SELECT id_Usuarios, email, password, nombre FROM usuarios WHERE email = '$email'";
	$result = mysql_query($query,$dbConect);
	$row = mysql_fetch_array($result);
	$pass_from_db = $row['password'];
	unset($query);

	//comprobamos que las contraseñas coincidan
	if ($pass_from_db == md5($password)) {
		$_SESSION['user'] = $row['nombre'];
		$_SESSION['id_Usr'] = $row['id_Usuarios'];
		echo json_encode(array("type"=>"succes", "text" => "Redireccionando."));	
	}
	else{
		echo json_encode(array("type"=>"error", "text" => "<p>El nombre de usuario o contraseña no coinciden</p>"));	
	}

	
}


?>