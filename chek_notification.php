<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_user = $_POST['id_user'];
    $ids_not = $_POST['ids_not'];
    $ids_not=json_decode($ids_not );
    $ids_not= implode(',' ,$ids_not);
    $ids_not.= 0;
    $ids_ar1 = "SELECT buyer , id_product , date_order, checked from order_prd WHERE seller='$id_user' ;";
    $ids_user = [];
    try {
        $get_ids = mysqli_query($con, $ids_ar1);
        while ($r1 = mysqli_fetch_assoc($get_ids)) {
            array_push($ids_user, $r1);
        }
        if (count($ids_user) > 0) {
            foreach ($ids_user as $id) {
                $get_buyer_prd = "SELECT   o.id_order ,   u.last_name , u.first_name,  u.link_profil  , p.name_product , p.id_product , o.checked from users3 u , product p , order_prd o WHERE p.id_product=o.id_product AND u.id_user = o.buyer AND o.seller ='$id_user' AND o.id_order NOT IN (".$ids_not.");";
                // echo $get_buyer_prd;
                try {
                    $get_d2 = mysqli_query($con, $get_buyer_prd);
                    $arr_buyer = [];
                    while ($r2 = mysqli_fetch_assoc($get_d2)) {
                        array_push($arr_buyer, $r2);
                    }
                } catch (\Throwable $th) {
                    echo $th;
                }

            }
            
            if (count($arr_buyer) > 0) {
                $arr_buyer = json_encode($arr_buyer);
                print_r($arr_buyer);
            }
        }
        $Q_UPDQTE= "UPDATE order_prd SET checked = 'trur' WHERE seller='$id_user'";
         mysqli_query($con , $Q_UPDQTE);
    } catch (\Throwable $th) {
        echo $th;
    }












    // $file_name = 'Order_Of' . $id['buyer'] . '.json';
    // if (!file_exists($file_name)) {
    //     $init = [];
    //     $init = json_encode($init);
    //     file_put_contents($file_name, $init);

    //     $conten_file = file_get_contents($file_name);
    //     $conten_file = json_decode($conten_file, true);
    //     $data = json_decode($arr_buyer, true);
    //     array_push($conten_file, $data[0]);
    //     $data = json_encode($arr_buyer);
    //     $conten_file = json_encode($conten_file);
    //     file_put_contents($file_name, $conten_file);
    // } else {
    //     $conten_file = file_get_contents($file_name);
    //     $conten_file = json_decode($conten_file, true);
    //     $data = json_decode($arr_buyer, true);
    //     array_push($conten_file, $data[0]);
    //     $conten_file = json_encode($conten_file);
    //     file_put_contents($file_name, $conten_file);
    // }


}
