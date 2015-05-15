<?php
	//This queries the database
	@mysql_select_db($database) or die( "Unable to select database: " . mysql_error());

	$query="SELECT COLUMN_NAME 
		FROM INFORMATION_SCHEMA.COLUMNS 
		WHERE TABLE_SCHEMA='database33' AND TABLE_NAME='contacts' AND COLUMN_NAME in ('id','first','last')"; 
	$col_result=mysql_query($query);

	$c_num=mysql_numrows($col_result);
	$name =  " columns: " . $c_num;
	//echo $name;

	//mysql_close();
?>

<?php
	//This queries the database
	@mysql_select_db($database) or die( "Unable to select database: " . mysql_error());

	//$query="SELECT * FROM contacts";
	$query="SELECT id,first,last FROM contacts";
	$q_result=mysql_query($query);

	$q_num=mysql_numrows($q_result);
	$name =  " rows: " . $q_num;
	//echo $name;

	mysql_close();
?>