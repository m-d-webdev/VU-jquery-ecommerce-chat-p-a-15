<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // concept: 'add_follower',
    $follower_id = $_POST['follower_id'];
    $costemer = $_POST['costemer'];
    if ($_POST['concept'] == 'add_follower') {
        try {
            mysqli_query($con, "INSERT INTO `relation_follow`(`customer_id`, `follower_id`) VALUES ('$costemer','$follower_id')");
            echo 'added_follow';
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    if ($_POST['concept'] == 'cancel_follower') {
        try {
            mysqli_query($con, "DELETE FROM `relation_follow` WHERE customer_id='$costemer'AND  follower_id ='$follower_id' ");
            echo 'canceled_follow';
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
