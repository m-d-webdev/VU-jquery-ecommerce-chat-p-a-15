<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $id_user = $_POST["id_user"];
    $id_prodect = $_POST["id_prodect"];
    $stars = $_POST["stars"];
    $desc = $_POST["desc"];
    $QUERY_set = "INSERT INTO  rating_product (`id_product`, `user_id`, `stars` ,`desc`) VALUES( '$id_prodect' , '$id_user' , '$stars' ,'$desc')";
    try {
        mysqli_query($con, "DELETE FROM rating_product WHERE id_product = '$id_prodect' AND user_id ='$id_user' ;");
        mysqli_query($con, $QUERY_set);
        $average_stars = mysqli_fetch_assoc(mysqli_query($con, "SELECT AVG(stars) , stars  FROM rating_product WHERE id_product = '$id_prodect' ;"));
        print_r(json_encode($average_stars));
    } catch (\Throwable $th) {
        throw $th;
    }
}
