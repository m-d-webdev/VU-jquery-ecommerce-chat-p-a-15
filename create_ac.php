<?php
    include "conn.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $f_name = $_POST['f_name'];
    $l_name = $_POST['l_name'];
    $user_name = $_POST['user_name'];
    $B_D = $_POST['B_D'];
    $gender = $_POST['gender'];
    $phone = $_POST['phone'];
    $adress = $_POST['adress'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $pro_pic = "";
    if($gender == "Male"){
        $pro_pic = "profiles/profile.png";

    }
    else if( $gender == "Female"){
        $pro_pic = "profiles/profile2.png";
    }
    else if( $gender == "Private"){
        $pro_pic = "profiles/profile3.png";
    }
    $hashedPAS = password_hash($password, PASSWORD_DEFAULT);
    $qu = "INSERT INTO users3 ( `user_email`, `password`, `user_name`, `gender`, `last_name`, `first_name`,  `link_profil`, `phone`, `adress`, `B_D`) values ('$email','$hashedPAS','$user_name','$gender','$l_name','$f_name','$pro_pic','$phone','$adress','$B_D');";
    try {
        mysqli_query($con, $qu);
    } catch (\Throwable $th) {
        echo ($th);
    }
    $selct_id = "SELECT * from users3 WHERE user_email LIKE '$email';";
    try {
        $exec = mysqli_query($con, $selct_id);
        $succes = true;
    } catch (\Throwable $th) {
        $succes = false;
    }

    $data = [];

    while($row = mysqli_fetch_assoc($exec)){
        array_push($data, $row);
    }

    $data = json_encode($data);
    print_r($data);
}
