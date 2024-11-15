<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_prdect = $_POST['id_prodect'];
    $query_prodect  = "SELECT p.* , u.*  FROM users3 u , product p  WHERE p.id_product = '$id_prdect' AND  p.id_user = u.id_user ";
    $exec_1 = mysqli_query($con, $query_prodect);
    $data = [];
    while ($rows = mysqli_fetch_assoc($exec_1)) {
        array_push($data, $rows);
    }

    //  (``, `user_id`, `stars` ,`desc`) 
    $exe_rat = mysqli_query($con, "SELECT AVG(stars) as AVG_stars ,COUNT(user_id) as count_users FROM rating_product WHERE id_product = '$id_prdect'");
    $exe_rat = mysqli_fetch_assoc($exe_rat);
    if ($exe_rat['AVG_stars'] == null) {
        $data['count_users']=  $exe_rat['count_users'];
        $data['AVG_stars'] = '0';
    }
    else{
        $data['AVG_stars'] =$exe_rat['AVG_stars'];
        $data['count_users']=  $exe_rat['count_users'];

    }
    
    
    $data = json_encode($data);
    print_r($data);
}
