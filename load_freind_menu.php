<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_user = $_POST["id_user"];
    if ($_POST["concept"] == "select") {
        $array_of_friend = [];
        $q = "SELECT * FROM friends WHERE id_user1 ='$id_user' OR id_user2 ='$id_user'   ;";
        $e = mysqli_query($con, $q);
        $ids_friends = [];
        while ($r = mysqli_fetch_assoc($e)) {
            array_push($ids_friends, $r);
        }

        if (count($ids_friends) > 0) {
            foreach ($ids_friends as $friend_is) {
                foreach ($friend_is as $id_f) {
                    if ($id_f != $id_user) {
                        $Q_get_info = "SELECT * FROM users3 WHERE id_user = '$id_f'";
                        $exe5 = mysqli_query($con, $Q_get_info);
                        $roe = mysqli_fetch_assoc($exe5);
                        array_push($array_of_friend, $roe);
                    }
                }
            }
            $array_of_friend =json_encode($array_of_friend);
            print_r($array_of_friend);
           
        }
        // print_r($ids_friends);

    } else if ($_POST["concept"] == "insert") {
        $id_order = $_POST["id_order"];
        $q3 = "SELECT buyer FROM order_prd WHERE id_order='$id_order';";
        $exe_id = mysqli_query($con, $q3);
        $buyer_id = mysqli_fetch_assoc($exe_id);
        $id_user2 =  $buyer_id['buyer'];
        $q22 = "SELECT * FROM friends WHERE id_user1= '$id_user' AND   id_user2= '$id_user2' or id_user2= '$id_user' AND id_user1= '$id_user2' ";
        $e = mysqli_query($con, $q22);
        $arr_check = [];
        while ($r = mysqli_fetch_assoc($e)) {
            array_push($arr_check, $r);
        }
        if (count($arr_check) == 0) {
            $q2 = "INSERT  INTO friends(`id_user1`,`id_user2`)  VALUES ( $id_user , $id_user2) ";
            try {
                mysqli_query($con, $q2);
                echo $id_user2;
            } catch (\Throwable $th) {
                echo $th;
            }
        } else if (count($arr_check) > 0) {
            echo $id_user2;
        }
    }
}
