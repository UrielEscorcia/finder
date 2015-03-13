<?php

function conectarBD(){
	$db_con = @mysql_connect("localhost:8889","root","root");
	if (!$db_con){
		echo "Error conectando a la base de datos."; 
		return false;
	}
	if (!mysql_select_db("finder", $db_con)) {
		echo  "Error seleccionando la base de datos.";
		return false;
	}
	mysql_set_charset("utf8",$db_con); 

	return $db_con;
}

?>