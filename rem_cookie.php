<?php
if($_SERVER['REQUEST_METHOD'] == "POST"){
    setcookie("user_name" , "" , time()-3600 , "/");
}

?>