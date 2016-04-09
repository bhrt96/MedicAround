<?php

include 'connect.php';

include 'session.php';
if (isset($_POST['docregister'])) {
	$username = $_POST['username'];     //@ to indicate doctor in login table
	$password = $_POST['password'];
	$name = $_POST['name'];
	$qualifications = $_POST['qualification'];
	$specialisation = $_POST['specialisation'];
	$experiences = $_POST['experience'];
	$latitude = $_POST['lat']; 
	$longitude = $_POST['long'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$rating = NULL;
	$gender = $_POST['gender'];

	beginSession($username, "doctor");

	mysql_query("INSERT INTO login VALUES('$username', '$password')");
	mysql_query("INSERT INTO doctors VALUES('$username', '$name', '$gender', '$qualifications', '$specialisation', $experiences, '$rating', '$email', '$phone', '$latitude', '$longitude')");

}

if (isset($_POST['patregister'])) {
	$username = $_POST['username'];      //! to indicate patient in login table
	$name = $_POST['name'];
	$latitude = $_POST['lat'];
	$longitude = $_POST['long'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$password = $_POST['password'];
	$gender = $_POST['gender'];

	beginSession($username, "patient");

	mysql_query("INSERT INTO login VALUES('$username', '$password')");
	mysql_query("INSERT INTO patients VALUES('$username', '$name', '$gender', '$phone', '$latitude', '$longitude', '$email')");
	header("Location: ../patientHome.html?p-user=".$username);
}

?>