<?php

include 'connect.php';

if (isset($_POST['docregister'])) {
	print_r($_POST);
	$username = '@'.$_POST['username'];     //@ to indicate doctor in login table
	$password = $_POST['password'];
	$name = $_POST['name'];
	$qualifications = $_POST['qualification'];
	$specialisation = $_POST['specialisation'];
	$experiences = $_POST['experience'];
	// $address = $_POST['address'];    //LAtitudes Longotusdes
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$rating = NULL;
	$address = NULL;

	mysql_query("INSERT INTO login VALUES('$username', '$password')");
	mysql_query("INSERT INTO doctors VALUES('$username', '$name', '$qualifications', '$specialisation', '$experiences', '$rating', '$address', '$email', '$phone')");

}

if (isset($_POST['patregister'])) {
	$username = '!'.$_POST['username'];
	$name = $_POST['name'];
	// $address = $_POST['address'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$password = $_POST['password'];
	$gender = $_POST['gender'];

	mysql_query("INSERT INTO login VALUES('$username', '$password')");
	mysql_query("INSERT INTO patients VALUES('$username', '$name', '$gender', NULL,'$phone', '$email')") or die("nfhjsgjksgsgf");

}

?>