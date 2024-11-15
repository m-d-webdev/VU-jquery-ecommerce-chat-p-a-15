<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {

  if ($_POST['loadmain'] == true) {
    $type = $_POST['type'];
    if ($type == 'all') {
      $QloadMAin = "SELECT * FROM product    WHERE available = 'available'  ORDER BY RAND() LIMIT 50 ";
    } else {
      $QloadMAin = "SELECT  *  FROM product  WHERE  type_product LIKE '$type'  AND available = 'available' ORDER BY RAND() LIMIT 20 ";
    }

    $exec = mysqli_query($con, $QloadMAin);
    $data = [];
    if (mysqli_num_rows($exec) > 0) {
      while ($row = mysqli_fetch_assoc($exec)) {
        $avrg_prd = mysqli_fetch_assoc(mysqli_query($con, "SELECT AVG(stars) as avg_stars , COUNT(user_id) as count_users FROM rating_product WHERE id_product ={$row['id_product']} "));
        if ($avrg_prd['avg_stars']  == null) {
          $row['avg_stars'] = '0';
        } else {
          $row['avg_stars'] = $avrg_prd['avg_stars'];
        }
        $row['count_users'] = $avrg_prd['count_users'];
        array_push($data, $row);
      }
    }

    if (!empty($data)) {
      $data = json_encode($data);
      print_r($data);
    } else if (empty($data)) {
      echo json_encode('no_res');
    }
  }
}
