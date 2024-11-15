<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id = $_POST['user_id'];
    $elemType = $_POST['elemType'];
    echo $id;
    $elemType = $_POST['elemType'];
    if (isset($_POST['newValue'])) {
        $newValue = $_POST['newValue'];
    } else if ($_FILES['newValue']) {
        $newValue = $_FILES['newValue'];
        print_r($newValue);
    }
}
