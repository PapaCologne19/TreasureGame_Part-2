<?php 

include 'connect.php';

if(isset($_POST['button_click'])){
    $user = $_POST['user'];
    $score = $_POST['score'];

    if(!empty($user)){
        $query = "INSERT INTO user (name, score) VALUES (?, ?)";
        $stmt = $connect->prepare($query);
        $stmt->bind_param("ss", $user, $score);

        if($stmt->execute()){
            echo "Success";
        } else {
            echo "Error";
        }
    } else {
        echo "Error";
    }
    header("Location: index.php");
    exit(0);
}