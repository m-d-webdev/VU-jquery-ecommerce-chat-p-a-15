<?php
include 'conn.php';
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id_user = $_POST['id_user'];
    $Q_get_msgs = "SELECT  * FROM messages  WHERE id_res ='$id_user'  AND checked = 'false' ;";
    $params = [];
    $exex = mysqli_query($con, $Q_get_msgs);
    while ($rwos = mysqli_fetch_assoc($exex)) {
        array_push($params, $rwos);
    }
    $dir_name = 'messages_of' . $id_user . '/';
    if (!is_dir($dir_name)) {
        mkdir($dir_name);
    }
    print_r(json_encode($params));
    foreach ($params as $p) {
        if ($p['id_sen'] == $id_user) {
            $file_n = 'chat' . $id_user . $p['id_res'] . '.json';
            $file_path =$dir_name.$file_n;
            if (!file_exists($file_path)){
                $init = [];
                $init = json_encode($init);
                file_put_contents($file_path, $init);
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $p);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
            } else {
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $p);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
            }
        } else if ($p['id_res'] == $id_user) {
            $file_n = 'chat' . $id_user . $p['id_sen'] .  '.json';
            $file_path =$dir_name.$file_n;
            if (!file_exists($file_path)) {
                $init = [];
                $init = json_encode($init);
                file_put_contents($file_path, $init);
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $p);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
                $Q_check_msgs = "UPDATE  messages SET checked = 'true' WHERE  id_res ='$id_user';";
                mysqli_query($con, $Q_check_msgs);
            } else {
                $conten_file = file_get_contents($file_path);
                $conten_file = json_decode($conten_file, true);
                array_push($conten_file, $p);
                $conten_file = json_encode($conten_file);
                file_put_contents($file_path, $conten_file);
                $Q_check_msgs = "UPDATE  messages SET checked = 'true' WHERE  id_res ='$id_user';";
                mysqli_query($con, $Q_check_msgs);
            }
        }
    }
}
