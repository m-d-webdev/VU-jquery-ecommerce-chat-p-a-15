<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] ==  "POST") {
    $ids_prd = $_POST['ids_prd'];
    $type_prd = $_POST['type_prd'];
    $data = [];
    $ids_prd = json_decode($ids_prd);
    $ids_prd = join(',', $ids_prd);

    if ($type_prd == "all") {
        $query1 = "SELECT * FROM product    WHERE available = 'available'  ORDER BY RAND() LIMIT 50 ";
        $exec1 = mysqli_query($con, $query1);
        if (mysqli_num_rows($exec1) > 0) {
            while ($rows = mysqli_fetch_assoc($exec1)) {
                $avrg_prd = mysqli_fetch_assoc(mysqli_query($con, "SELECT AVG(stars) as avg_stars , COUNT(user_id) as count_users FROM rating_product WHERE id_product ={$rows['id_product']} "));
                if ($avrg_prd['avg_stars']  == null) {
                    $rows['avg_stars'] = '0';
                } else {
                    $rows['avg_stars'] = $avrg_prd['avg_stars'];
                }
                $rows['count_users'] = $avrg_prd['count_users'];
                array_push($data, $rows);
            }
            $data = json_encode($data);
            print_r($data);
        }
    } else {
        $q_select_da2 = "SELECT * FROM product WHERE type_product LIKE  '$type_prd'  AND id_product NOT IN ($ids_prd)  AND available = 'available'   limit  50;";
        $exec3 = mysqli_query($con, $q_select_da2);
        if (mysqli_num_rows($exec3) > 0) {
            while ($rows = mysqli_fetch_assoc($exec3)) {
                $avrg_prd = mysqli_fetch_assoc(mysqli_query($con, "SELECT AVG(stars) as avg_stars , COUNT(user_id) as count_users FROM rating_product WHERE id_product ={$rows['id_product']} "));
                if ($avrg_prd['avg_stars']  == null) {
                    $rows['avg_stars'] = '0';
                } else {
                    $rows['avg_stars'] = $avrg_prd['avg_stars'];
                }
                $rows['count_users'] = $avrg_prd['count_users'];
                array_push($data, $rows);
            }
            $data = json_encode($data);
            print_r($data);
        }
    }
    if (empty($data)) {
        echo json_encode("no_res");
    }
}
