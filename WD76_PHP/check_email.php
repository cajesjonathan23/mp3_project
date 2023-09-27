<?php
    header('Access-Control-Allow-Origin: *');
    include "mp3_db.php";

    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['email'])) {
        $email = $_GET['email'];
    
       
        $query = "SELECT COUNT(*) AS count FROM users_tbl WHERE email = '$email'";
        $result = mysqli_query($conn, $query);
    
        if (!$result) {
           
            echo "error";
            exit();
        }
    
        $row = mysqli_fetch_assoc($result);
        $count = (int) $row['count'];
    
        if ($count > 0) {
            // 
            echo "Email is already taken";
        } else {
            // Email is available
            echo "available";
        }
    } else {
        // Invalid request
        echo "invalid";
    }
    
  
     mysqli_close($conn);
    


?>