<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $concept = $_POST['concept'];
    $user_id = $_POST['user_id'];
    $query;
    if ($concept == "get_followers") {
        $query =  "SELECT u.id_user,  u.user_name,u.last_name, u.first_name, u.link_profil FROM users3 u , relation_follow r WHERE r.follower_id= u.id_user AND r.customer_id ='$user_id'";
        $exe = mysqli_query($con, $query);
        $data = [];
        if (mysqli_num_rows($exe)) {
            while ($rows = mysqli_fetch_assoc($exe)) {
                array_push($data, $rows);
            }
            $data = json_encode($data);
            echo $data;
        } else {
                echo json_encode("no_followers");
        }
    }
    if ($concept == "get_following") {
        $query =  "SELECT u.id_user,  u.user_name, u.last_name, u.first_name, u.link_profil FROM users3 u , relation_follow r WHERE r.customer_id= u.id_user AND r.follower_id ='$user_id'";

        $exe = mysqli_query($con, $query);
        $data = [];
        if (mysqli_num_rows($exe)) {
            while ($rows = mysqli_fetch_assoc($exe)) {
                array_push($data, $rows);
            }
            $data = json_encode($data);
            echo $data;
        } else {
            echo json_encode("no_following");
        }
    }
    else if($concept == 'remove_follower'){
        $id_f = $_POST['follwer_id'];
        $query = "DELETE FROM relation_follow WHERE follower_id = '$id_f' AND customer_id = '$user_id'";
        $exe = mysqli_query($con, $query);
        echo json_encode('removed');
    }
    else if($concept == 'remove_following'){
        $id_f = $_POST['follwer_id'];
        $query = "DELETE FROM relation_follow WHERE customer_id = '$id_f' AND follower_id = '$user_id'";
        $exe = mysqli_query($con, $query);
        echo json_encode("unfollwed");
    }
}
