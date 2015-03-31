<?php 
//archivos necesarios
require_once 'conexion.php';

//variable de coneccion con db
$dbConect = conectarBD();
mysql_set_charset("utf8",$dbConect);

	if ($_POST) {

		$id_Establecimientos = $_POST['delete_id'];
		
		
		if (!empty($id_Establecimientos)) {
			$query = "DELETE FROM establecimientos WHERE id_Establecimientos = '$id_Establecimientos'";
			
			if (mysql_query($query, $dbConect)) 
				echo json_encode(array("type"=>"succes", "text" => "Eliminado."));	
			else
				echo json_encode(array("type"=>"error", "text" => "<p>Error al eliminar</p>"));
			
			

		}
		
	}
	

?>