<?php

function beginSession($user) {
	session_start();
	$_SESSION['user'] = $user;
}

?>