<?php

function beginSession($user, $type) {
	session_start();
	$_SESSION['user'] = $user;
	$_SESSION['type'] = $type;
}

?>