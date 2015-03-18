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
	$apellido = $_POST['apellidos'];
	$fech_nac = $_POST['birthday'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	$repassword = $_POST['re-password'];
	$tipo = $_POST['tipo'];
	$sexo = $_POST['sex'];

	if ($password != $repassword) {
		echo json_encode(array("type"=>"error", "text" => "Las contraseñas no coinciden"));	
	}else{

		if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
			//verifica que no exista usuario
			
			$busca_email = "SELECT email FROM usuarios WHERE email='$email'";
			
			$resul_email = mysql_query($busca_email, $dbConect);
			if (mysql_num_rows($resul_email) != 0) 
				echo json_encode(array("type"=>"error", "text" => "<p>Email existente. Introduce uno nuevo</p>"));
			else{
				//registro de usuario
				$query = "INSERT INTO usuarios (nombre,apellidos,fechaNac,sexo,tipo,password,email) VALUES ('$nombre','$apellido','$fech_nac','$sexo','$tipo','".md5($password)."','$email')";
				$resut = mysql_query($query,$dbConect);

				$query = "SELECT id_Usuarios, email, password, nombre FROM usuarios WHERE email = '$email'";
				$result = mysql_query($query,$dbConect);
				$row = mysql_fetch_array($result);
				$_SESSION['user'] = $nombre;
				$_SESSION['id_Usr']= $row['id_Usuarios'];
				echo json_encode(array("type"=>"succes", "text" => "Redireccionando."));	
			}
			
		}else
			echo json_encode(array("type"=>"error", "text" => "<p>Error email no valido.</p>"));
		
	}		

	
}


?>