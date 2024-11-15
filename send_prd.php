<?php
include "conn.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = $_POST;
  $files = $_FILES['file'];
  $glob_ar = [];
  for ($i = 0; $i < count($files['name']); $i++) {
    array_push($glob_ar, [$files['name'][$i], $files['tmp_name'][$i]]);
  }
  // $data = json_decode($data, true);

  if (!is_dir('files_product22')) {
    mkdir("files_product22");
  }
  $dir_ig2 = [];
  foreach ($glob_ar as $a) {
    $dir_ig = "files_product22/" . basename($a[0]);
    move_uploaded_file($a[1], $dir_ig);
    array_push($dir_ig2, $dir_ig);
  }
  $glob_ar2 = join(",", $dir_ig2);

  try {
    // (`id_user`, `id_product`, `type_product`, `name_product`, `des_img`, `price`, `stock`, `description`, `local_product`, `delivry_type`, `statu_prd`, `available`
    $quey1 = "INSERT INTO product  (id_user ,type_product ,name_product ,des_img , price , stock ,description , local_product, delivry_type , statu_prd)
        VaLUES (  
          '{$data['id_user']}',
          '{$data['type_product']}',
          '{$data['name_product']}',
          '$glob_ar2',
          '{$data['price']}',
          '{$data['stock']}',
          '{$data['description']}',
          '{$data['local_product']}',
          '{$data['delivry_type']}',
          '{$data['statu_prd']}'
          
    )";
    // mysqli_query($con, $quey1);
    echo true;
  } catch (\Throwable $th) {
    echo $th;
    echo false;
  }
}
