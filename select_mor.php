<?php
include "conn.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id_prodect = $_POST['id_prodect'];
    $Q1 = "SELECT type_product from product  WHERE id_product =  '$id_prodect'";
    $e1 = mysqli_query($con, $Q1);
    $tyoe_product = mysqli_fetch_assoc($e1);
    $Q2 = "SELECT * FROM  product p ,users3 u  WHERE p.type_product LIKE '{$tyoe_product['type_product']}' AND p.id_user = u.id_user  and  p.id_product NOT IN  ($id_prodect)  and available = 'available'  ";
    $exe2 = mysqli_query($con, $Q2);
    $data = [];
    while ($rows = mysqli_fetch_assoc($exe2)) {
        array_push($data, $rows);
    }
    $data = json_encode($data);
    print_r($data);
    
}
