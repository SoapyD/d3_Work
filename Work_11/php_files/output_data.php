
<?
	echo "<b><center>Database Output</center></b><br><br>";

	//SET AN ARRAY THAT'LL CONTAIN NESTED ARRAYS DETAILING EACH LINE
	$queried_dServer = array();

	$i=0;
	//FOR EACH ROW IN THE DATABASE QUERY
	while ($i < $q_num) {
		$n=0;
		$line_array = array();

		//FOREACH FIELD WITHIN THE SELECTED ROWN
		while ($n < $c_num) {
			//ADD THE COLUMN VALUE TO A LINE_ARRAY TO SAVE LATER
			$col_name = mysql_result($col_result,$n);
			$col_val=mysql_result($q_result,$i,$col_name);
			$line_array[$n] = $col_val;
			$n++;
		};
		//SAVE THE LINE_ARRAY AS A SINGLE ENTRY
		$queried_dServer[$i] = $line_array;
		$i++;
	};
	$arr_pos = 0;
	echo json_encode($queried_dServer[$arr_pos]);
	echo "<br>";
	$arr_pos = 1;
	echo json_encode($queried_dServer[$arr_pos]); 
?>
