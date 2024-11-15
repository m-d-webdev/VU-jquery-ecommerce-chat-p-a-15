<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $type = $_POST['type'];
    $id_user = $_POST['id_user'];
    $orderd = $_POST['orderd'];
    $order ='';
    if($orderd =='n_l'){
        $order ="DESC";
    }else{
        $order ="ASC";
    }
    $query = '';

    if ($type == "all") {
        $query = "SELECT * FROM product  WHERE id_user = '$id_user'  AND available = 'available' ORDER by '$id_user'  $order ; ";
    } else {
        $query = "SELECT * FROM product  WHERE id_user = '$id_user'  AND  type_product LIKE '$type'   ORDER by '$id_user'  $order; ";
    }
    $data = [];
    $exec = mysqli_query($con, $query);
    while ($r = mysqli_fetch_assoc($exec)) {
        array_push($data, $r);
    }
    $data = json_encode($data);
    print_r($data);
}

