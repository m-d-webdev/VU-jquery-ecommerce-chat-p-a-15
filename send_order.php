<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id_user = $_POST['id_user'];
    $id_seller = $_POST['id_seller'];
    $id_product = $_POST['id_product'];
    $queru_ordr = "INSERT INTO order_prd (buyer , seller, id_product) VALUES
    ('$id_user' , '$id_seller' , '$id_product');";
    
    try {
        mysqli_query($con , $queru_ordr);
        echo 'sended';
    } catch (\Throwable $th) {
        echo 'not_sended'.$th;
    }
}
