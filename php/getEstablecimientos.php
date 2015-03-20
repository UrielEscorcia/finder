<?php 
//archivos necesarios
require_once 'conexion.php';

//variable de coneccion con db
$dbConect = conectarBD();
mysql_set_charset("utf8",$dbConect);

	if ($_GET) {

		$id_categoria = $_GET['idCategoria'];
		if (!empty($id_categoria)) {
			$negocios = array();
			$query = "SELECT * FROM establecimientos WHERE categoria='$id_categoria'";
			$result = mysql_query($query, $dbConect);
			while ($row = mysql_fetch_assoc($result)) {
				array_push($negocios, $row);
			}
			echo json_encode($negocios);

		}
		
	}
	

?>