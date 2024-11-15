<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    function decrypt_cookie($encrypted_data_with_iv, $key)
    {
        $cipher_method = 'aes-256-cbc';
        $data = base64_decode($encrypted_data_with_iv);
        $iv_length = openssl_cipher_iv_length($cipher_method);
        $iv = substr($data, 0, $iv_length);
        $encrypted_data = substr($data, $iv_length);
        $decrypted_data = openssl_decrypt($encrypted_data, $cipher_method, $key, 0, $iv);
        return $decrypted_data;
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_COOKIE["user_name"])) {
            $encrypted_cookie = $_COOKIE["user_name"];
            $decrypted_data = decrypt_cookie($encrypted_cookie, 'aghrom123');
            $email_i = json_decode($decrypted_data);
            $id_user = mysqli_fetch_assoc(mysqli_query($con, "SELECT id_user from users3 WHERE user_email LIKE '" . $email_i[0] . "' ;"));
            $qu_get_following = mysqli_query($con, "SELECT customer_id FROM relation_follow WHERE follower_id = '{$id_user['id_user']}' ");
            $following = [];
            while ($exe_get_follolowing = mysqli_fetch_assoc($qu_get_following)) {
                array_push($following, $exe_get_follolowing['customer_id']);
            }
            $qu_get_followers = mysqli_query($con, "SELECT follower_id FROM relation_follow WHERE customer_id  = '{$id_user['id_user']}' ");
            $followers = [];
            while ($exe_get_follolowers = mysqli_fetch_assoc($qu_get_followers)) {
                array_push($followers, $exe_get_follolowers['follower_id']);
            }
            
            $user_data = array(
                'user_id' => $id_user['id_user'],
                'following_ids' => $following,
                'followers_ids' => $followers,
            );
            print_r(json_encode($user_data));
        } else {
            $nore = "NOT_FOUND";
            echo json_encode($nore);
        }
    }
}
