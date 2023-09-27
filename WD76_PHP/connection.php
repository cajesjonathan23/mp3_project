<?php
$server = "localhost";
$username = "root";
$password = "";
$db = "kodego_db";

$conn = mysqli_connect($server,$username,$password,$db);

if($conn){
    echo "Connected Successfully";
}

?>