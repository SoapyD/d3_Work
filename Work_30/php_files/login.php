<?php
	//This connects to the database
	$username='soapyduser1';
	$password='today01';
	$database='database33';
	$variable_val = "this is working";
?>

<?php
	$conn = mysql_connect('soapydevcom.ipagemysql.com',$username,$password);
	if($conn){
	//	echo("Connection Successful");
	}else{
	//	echo("Connection Failed");
	}
?>