<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] =="POST" ){
    $email_text = $_POST['email_text'];
    $e =mysqli_query($con , "SELECT id_user FROM users3 WHERE user_email LIKE '$email_text'");
    if(mysqli_num_rows($e)>0){
        echo "ALREADY_EXISTS";
    }
    else{
        echo "NOT_EXISTS";
    }
}