<?php
include "conn.php";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $prd_inf = $_POST['prd_inf'];
    $QUERY_SERCH = "SELECT  DISTINCT name_product , id_product  FROM product WHERE name_product LIKE '$prd_inf%'  AND available = 'available'  ";
    $exe1 = mysqli_query($con, $QUERY_SERCH);
    while ($rows = mysqli_fetch_assoc($exe1)) {
        echo "<div id=" . $rows['id_product'] . " class='prd_rserched'>
               <p>" . $rows['name_product'] . "</p>
             </div>";
    }
}
