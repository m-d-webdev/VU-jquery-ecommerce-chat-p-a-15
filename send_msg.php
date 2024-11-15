<?php
include "conn.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_user = $_POST["id_user"];
    $now_frien = $_POST["now_frien"];
    $type_msg = $_POST["type_msg"];
    if ($type_msg == "text") {
        $message = $_POST["message"];

        $quryinsert = "INSERT INTO messages ( `id_sen`, `id_res`, `message` , `type_msg`) VALUES  ('$id_user','$now_frien' ,'$message','$type_msg') ;";
        try {
            mysqli_query($con, $quryinsert);
            $query_select  = "SELECT * FROM messages WHERE id_msg = (SELECT MAX(id_msg) FROM messages WHERE id_sen ='$id_user'  AND id_res ='$now_frien') ; ";
            $get_new_mesg = mysqli_query($con, $query_select);
            $new_mesg = mysqli_fetch_assoc($get_new_mesg);
            $new_mesg_ar = [];
            array_push($new_mesg_ar, $new_mesg);
            print_r(json_encode($new_mesg_ar));
            $dir_name = 'messages_of' . $id_user . '/';
            $file_n = 'chat' . $id_user . $now_frien . '.json';
            $file_path = $dir_name . $file_n;
            if (!file_exists($file_path)) {
                $init = [];
                $init = json_encode($init);
                file_put_contents($file_path, $init);
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $new_mesg);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
            } else {
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $new_mesg);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
            }
        } catch (\Throwable $th) {
            echo $th;
        }
    } else {
        $files = $_FILES["message"];
        $names_and_tmps = [];
        $dir_name = 'messages_of' . $id_user . '/';
        $file_n = 'chat' . $id_user . $now_frien . '.json';

        for ($i = 0; $i < count($files['name']); $i++) {
            array_push($names_and_tmps, [$files['name'][$i], $files['tmp_name'][$i]]);
        }
        if (!is_dir($dir_name . "images/")) {
            mkdir($dir_name . "images/");
        }
        $ALL_des_imgs = [];
        foreach ($names_and_tmps as $imgs) {
            $img_name = uniqid('', true) . '.' . $imgs['0'];
            $des_img =  $dir_name . "images/" . $img_name;
            if (move_uploaded_file($imgs['1'], $des_img)) {
                array_push($ALL_des_imgs, $des_img);
            }
        }

        if (count($ALL_des_imgs) == count($names_and_tmps)) {
            $ALL_des_imgs = join(',', $ALL_des_imgs);
             $quryinsert = "INSERT INTO messages ( `id_sen`, `id_res`, `message` , `type_msg`) VALUES  ('$id_user','$now_frien' ,'$ALL_des_imgs','$type_msg') ;";
        try {
            mysqli_query($con, $quryinsert);
            $query_select  = "SELECT * FROM messages WHERE id_msg = (SELECT MAX(id_msg) FROM messages WHERE id_sen ='$id_user'  AND id_res ='$now_frien') ; ";
            $get_new_mesg = mysqli_query($con, $query_select);
            $new_mesg = mysqli_fetch_assoc($get_new_mesg);
            $new_mesg_ar = [];
            array_push($new_mesg_ar, $new_mesg);
            print_r(json_encode($new_mesg_ar));
            $file_path = $dir_name . $file_n;
            if (!file_exists($file_path)) {
                $init = [];
                $init = json_encode($init);
                file_put_contents($file_path, $init);
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $new_mesg);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
            } else {
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $new_mesg);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
            }
        } catch (\Throwable $th) {
            echo $th;
        }
        }

        
    }
}
