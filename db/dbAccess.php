<?php
$db_obj = new mysqli("localhost", "bif2webscriptinguser", "bif2021", "appointment_finder");
if ($db_obj->connect_errno) {
    echo "Failed to connect to MySQL: " . $db_obj->connect_error;
    exit();
}