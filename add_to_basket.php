<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_product = $_POST['data']['prd_id'];
    $user_id = $_POST['data']['user_id'];
    $seller_id = $_POST['data']['seller_id'];
    $qautite_prd = $_POST['data']['qautite_prd'];
    $urgc_dlvr = $_POST['data']['urgc_dlvr'];
    $id_basket;
    $selecy_id_basket =  mysqli_fetch_assoc(mysqli_query($con, "SELECT id_basket from basket WHERE user_id = '$user_id'"));
    if ($selecy_id_basket == "") {
        mysqli_query($con, "INSERT INTO basket VALUES ('' ,'$user_id','')");
        $selecy_id_basket =  mysqli_fetch_assoc(mysqli_query($con, "SELECT id_basket from basket WHERE user_id = '$user_id'"));
        $id_basket = $selecy_id_basket['id_basket'];
    } else {
        $id_basket = $selecy_id_basket['id_basket'];
    }

    // print_r($id_basket);
    $qure_inert_items = "INSERT INTO `card_item`(`id_item`, `id_basket`, `id_product`, `quantite`, `urgence_dlvr`) VALUES ('','$id_basket','$id_product','$qautite_prd','$urgc_dlvr')";
    try {
        mysqli_query($con, $qure_inert_items);
        echo 'added to basket succesful';
    } catch (\Throwable $th) {
        echo 'IRWAYN' . $th;
    }
    //
}
