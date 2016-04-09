<?php
	include 'connect.php';
	$lat = $_POST['lat'];
	$lng = $_POST['lng'];
	$result = mysql_query("SELECT name, latitude, longitude, username, specialization, rating FROM doctors");
	// $result = mysql_query("SELECT * FROM doctors");
	for($i=0;$i<mysql_num_rows($result);$i++)
		$rows[$i] = mysql_fetch_assoc($result);
	echo json_encode($rows);
?>