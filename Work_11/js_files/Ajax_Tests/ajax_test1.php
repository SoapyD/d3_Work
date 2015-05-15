<?php
	//the example of making MySQL database
	//create.php
	//$conn = mysql_connect("localhost","root","admin");
	$conn = mysql_connect('soapydevcom.ipagemysql.com', 'soapyduser1', 'today01');
	if($conn){
		echo("Connection is succeed");
	}else{
		echo("Connection is fail");
	}

	//$make = mysql_create_db("test");
	//if($make){
	//	echo("Database data_root succeeds in making");
	//}else{
	//	echo("Database data_root fails in making");
	//}
?>