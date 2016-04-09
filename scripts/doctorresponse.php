<?php

mysql_connect("localhost:3306", "root", "16maharshi@96Roy");
mysql_query("USE hackathon");

include 'session.php';
print_r($_POST);
session_start();

$patient = $_POST['patient'];
$date = $_POST['date'];
$time = $_POST['time'];
$reply = $_POST['reply'];
$doctor = $_POST['doctor'];

//echo $_SESSION['user'];
if ($reply) {
	mysql_query("UPDATE appointments SET patient = 'scarlett' WHERE patient = 'Hello'");
	mysql_query("UPDATE appointments SET date = str_to_date($date, '%Y, %m, %d'), time = str_to_date($time.':00', '%h %i %s') WHERE patient = '$patient' AND doctor = '$doctor'");
}
header('Location: ../drprofile.html?dr-user='.$_SESSION["user"]);


?>