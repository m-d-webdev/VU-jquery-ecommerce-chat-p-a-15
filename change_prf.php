<?php
include "conn.php";

if ($_SERVER['REQUEST_METHOD'] == "POST") {

  // echo $id_user;
  $id_user = $_POST['id_user'];
  $File = $_FILES['inp_f_prf'];
  $filename = $_FILES['inp_f_prf']['name'];
  $filetmp = $_FILES['inp_f_prf']['tmp_name'];
  $filesize = $_FILES['inp_f_prf']['size'];
  $filetype = $_FILES['inp_f_prf']['type'];
  $fileerror = $_FILES['inp_f_prf']['error'];
  $fileExt = explode('.', $filename);
  $fileActualExt = strtolower(end($fileExt));

  $Allowed = array('jpg', 'jpeg', 'png');
  if (in_array($fileActualExt, $Allowed)) {
    if ($fileerror === 0) {
      if ($filesize < 1000000) {
        $filenameNEW = uniqid('', true) . '.' . $fileActualExt;
        $fileDestination = 'profiles/' . $filenameNEW;
        move_uploaded_file($filetmp, $fileDestination);
        $quey5 = "UPDATE users3 SET link_profil = '$fileDestination' WHERE id_user = $id_user ";
        $exec5 = mysqli_query($con, $quey5);
        $quey6 = "SELECT link_profil FROM users3  WHERE id_user = $id_user ";
        $exec56 = mysqli_query($con, $quey6);

        $link_prf_new = mysqli_fetch_assoc($exec56);
        
        $link_prf_new = json_encode($link_prf_new);
        echo $link_prf_new;

      } else {
        echo "your file is to big";
      }
    } else {
      echo "there was an error uploading your file";
    }
  } else {
    echo "you cannot upload file of this type";
  }
}
