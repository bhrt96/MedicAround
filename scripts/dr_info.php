<?php
	include 'connect.php';
	$username = $_POST["username"];
	$result = mysql_query("SELECT * FROM doctors WHERE username='$username'");
	$rows = mysql_fetch_assoc($result);
	echo json_encode($rows);
?>