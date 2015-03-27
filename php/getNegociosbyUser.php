<?php 
//archivos necesarios
require_once 'conexion.php';

//variable de coneccion con db
$dbConect = conectarBD();
mysql_set_charset("utf8",$dbConect);

	if ($_GET) {

		$propietario = $_GET['datos'];
		
		
		if (!empty($propietario)) {
			$negocios = array();
			$query = "SELECT * FROM establecimientos WHERE propietario='$propietario'";
			$result = mysql_query($query, $dbConect);
			while ($row = mysql_fetch_assoc($result)) {
				array_push($negocios, $row);
			}
			echo json_encode($negocios);

		}
		
	}
	

?>