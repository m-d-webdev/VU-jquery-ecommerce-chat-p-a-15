<?php
include "conn.php";
$key = "aghrom123";
// Function to encrypt cookie data
function encrypt_cookie($data, $key)
{
    $cipher_method = 'aes-256-cbc';
    $iv_length = openssl_cipher_iv_length($cipher_method);
    $iv = openssl_random_pseudo_bytes($iv_length);
    $encrypted_data = openssl_encrypt($data, $cipher_method, $key, 0, $iv);
    $encrypted_data_with_iv = base64_encode($iv . $encrypted_data);
    return $encrypted_data_with_iv;
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email_text = $_POST['email_text'];
    $inp2_pass = $_POST['inp2_pass'];


    $query_1 = "SELECT password , id_user FROM users3 WHERE user_email LIKE '$email_text'";
    $exe2 = mysqli_query($con, $query_1);
    $data = [];

    if (mysqli_num_rows($exe2) > 0) {
        while ($row = mysqli_fetch_assoc($exe2)) {
            if (password_verify($inp2_pass, $row['password'])) {
                $user_id = $row['id_user'];
                $cok = [$email_text, $inp2_pass];
                $cok = json_encode($cok);
                $encrypted = encrypt_cookie($cok, $key);
                setcookie("user_name", $encrypted, time() + 30*24*60*60, "/");
                echo $user_id;
            } else {
                $sucses = "incorrect Password";
                $sucses = json_encode($sucses);
                echo $sucses;
            }
        }
    } else {
        $not_found  = 'not found';
        $not_found = json_encode($not_found);
        echo $not_found;
    }
}


// /<?php 
// $con = mysqli_connect("localhost","root","","db_11");



// if($_SERVER["REQUEST_METHOD"] == "POST"){

//     $email1= $_POST["email"];
//     $password= $_POST["pass"];
//     $query ="select * from users where email= '$email1'";
//     try {
//         $ex= mysqli_query($con,$query) or die(mysqli_error($con));
//         $email=mysqli_fetch_array($ex);
//     if($email["email"] == ""){
//         echo "email uncorrect";
//     }else{
//     $query ="select password from users where email like '$email1'";

//         $ex= mysqli_query($con,$query) or die(mysqli_error($con));
//         $password2=mysqli_fetch_array($ex);
//         if (password_verify($password,$password2["password"])) {
//             $data=[$email, $password];
//             $data=json_encode($data);
//             $encrypted = encrypt($data , $key);
//             setcookie("user_name"  ,$encrypted, time()+ 30,"/");
//             echo  "test"   ;   }
//     }

//     } catch (\Throwable $th) {
        
//         echo $th;
//     }
// }