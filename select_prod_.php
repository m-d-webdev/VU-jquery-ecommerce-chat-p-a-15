<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if ($_POST['concept'] == "select") {
        $id_product = $_POST['id_product'];
        $Query = "SELECT * FROM product WHERE id_product = '$id_product'  AND available = 'available' ;";
        $exe = mysqli_query($con, $Query);
        $res = [];
        while ($r = mysqli_fetch_assoc($exe)) {
            array_push($res, $r);
        }
        $res = json_encode($res);
        print_r($res);
    }
    if ($_POST['concept'] == "update") {
        $item = $_POST["item"];
        $id_product = $_POST['id_product'];
        $value = $_POST["value"];
        $value = json_decode($value, true);
        if (is_array($value)) {
            $value = join(',', $value);
        }
        $Query2 = "UPDATE  product SET $item  = '$value' WHERE id_product  = '$id_product';";
        try {
            mysqli_query($con, $Query2);
            $Query = "SELECT * FROM product WHERE id_product = '$id_product' AND available = 'available' ;";
            $exe = mysqli_query($con, $Query);
            $res2 = [];
            while ($r = mysqli_fetch_assoc($exe)) {
                array_push($res2, $r);
            }
            $res2 = json_encode($res2);
            print_r($res2);
        } catch (\Throwable $th) {
            echo $th;
        }
    }
    // else if ($_POST['concept'] == "delete") {
    //     $id_product = $_POST['id_product'];
    //     // $q_ddelete = "DELETE FROM product WHERE id_product ='$id_product' ";
    //     try {
    //         mysqli_query($con , "DELETE FROM product WHERE id_product ='$id_product' ");
    //         echo 'removed';
    //     } catch (\Throwable $th) {
    //         echo $th;
    //     }
        
    // }
}
