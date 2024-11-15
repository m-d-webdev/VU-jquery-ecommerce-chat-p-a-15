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
        $query = "SELECT p.*,s.data_save FROM saved_product s ,product p  WHERE p.id_product = s.id_product And s.id_user = '$id_user'  ORDER by s.data_save  $order; ";
    } else {
        $query = "SELECT p.* , s.data_save  FROM saved_product s ,product p  WHERE p.id_product = s.id_product And s.id_user = '$id_user' AND p.type_product LIKE '$type'   ORDER by s.data_save  $order; ";
    }
    $data = [];
    $exec = mysqli_query($con, $query);
    while ($r = mysqli_fetch_assoc($exec)) {
        array_push($data, $r);
    }
    $data = json_encode($data);
    print_r($data);
}

