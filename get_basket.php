<?php
include "conn.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    $user_id = $_POST['user_id'];
    // SELECT `id_item`, `id_basket`, `id_product`, `quantite`, `urgence_dlvr`, `date_add`, `payed` FROM `card_item` WHERE 1
    $data = [];
    if($_POST['time'] == 'all'){
        $data = [];
        $Query1 ="SELECT c.quantite , p.* FROM  product p  , basket b , card_item c WHERE b.user_id ='$user_id' AND  c.id_basket = b.id_basket AND c.id_product = p.id_product  AND c.payed ='false' ORDER BY c.id_item DESC";
        $ex = mysqli_query($con ,$Query1);
        while($prd = mysqli_fetch_assoc($ex)){
            array_push($data , $prd);
        }

    }
    else{
        $data = [];
        $ex_date= $_POST['time'];
        $Query1 ="SELECT c.quantite ,  p.* FROM  product p  , basket b , card_item c WHERE b.user_id ='$user_id' AND  c.id_basket = b.id_basket AND c.id_product = p.id_product  AND c.payed ='false' AND $ex_date ORDER BY c.id_item DESC";
        $ex = mysqli_query($con ,$Query1);
        while($prd = mysqli_fetch_assoc($ex)){
            array_push($data , $prd);
        }
    }
    $data = json_encode($data);
    print_r($data);
}