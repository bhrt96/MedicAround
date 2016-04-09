<?php

include 'connect.php';
include 'session.php';

$username = $_POST['username'];
$password = $_POST['password'];    //username
// $username = 'dr'.$username;
$result = mysql_query("SELECT password FROM login WHERE username = '$username'");
if ($result) {
	$row = mysql_fetch_assoc($result);
	echo $row['password'];
	if ($row['password'] == $password) {      //password
		// -----successfully logged in-----
		beginSession($username, "patient");
		header('Location: ../patientHome.html?p-user='.$username);
	}
	else {
		// -----incorrect credentials----
	}
}	
else {
	// ------Register First-----
}

/*if (isset($_POST['patlogin'])) {    //button clicked id patients
	$username = $_POST['username'];    //username
	$result = mysql_query('SELECT password FROM patient_login WHERE username = $username');
	if ($result) {
		$password = mysql_fetch_assoc($result);
		if ($password == $_POST['password']) {      //password
			-----successfully logged in-----
		}
		else {
			-----incorrect credentials----
		}
	}
	else {
		-----Register First----
	}
}*/

?>