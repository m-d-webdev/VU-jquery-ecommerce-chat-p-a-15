<?php 
include "conn.php";
if($_SERVER["REQUEST_METHOD"] == "POST"){
 $id_user=$_POST['id_user'];
 $id_product=$_POST['id_product'];
 $queryiner=  "INSERT INTO saved_product (`id_user`, `id_product` ) values ('$id_user', '$id_product' )";
 try{
    mysqli_query($con , $queryiner);
    echo true;
 }catch (\Throwable $th){
    echo false;
 }
}
?>