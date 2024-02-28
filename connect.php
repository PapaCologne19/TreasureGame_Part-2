<?php 

$localhost = "localhost";
$user = "root";
$password = "";
$database = "laro";

$connect = mysqli_connect($localhost, $user, $password, $database);

if(!$connect){
    die('Connection Failed');
}