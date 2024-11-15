<?php
include "conn.php";
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $user_id = $_POST['user_id'];
    $Q_SEEL  ="SELECT * FROM users3 WHERE id_user = '$user_id' ";
    $info_user = mysqli_fetch_assoc(mysqli_query($con , $Q_SEEL));
    $info_user = json_encode($info_user);
    print_r($info_user);
}