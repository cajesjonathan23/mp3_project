<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include "mp3_db.php";


if (!$conn) {
    die('Database connection failed: ' . mysqli_connect_error());
}


if ($method === 'POST') {
    
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->email) && isset($data->currentPassword) && isset($data->newPassword)) {
        $email = mysqli_real_escape_string($conn, $data->email);
        $currentPassword = mysqli_real_escape_string($conn, $data->currentPassword);
        $newPassword = mysqli_real_escape_string($conn, $data->newPassword);

        
        $checkPasswordSql = "SELECT * FROM users_tbl WHERE email = '$email' AND pass = '$currentPassword'";
        $passwordResult = mysqli_query($conn, $checkPasswordSql);

        if ($passwordResult && mysqli_num_rows($passwordResult) === 1) {
      
            $updateSql = "UPDATE users_tbl SET pass = '$newPassword' WHERE email = '$email'";
            if (mysqli_query($conn, $updateSql)) {
                echo json_encode(['message' => 'Password updated successfully']);
            } else {
                echo json_encode(['message' => 'Password update failed']);
            }
        } else {
            echo json_encode(['message' => 'Current password is incorrect']);
        }
    } else {
        echo json_encode(['message' => 'Invalid request data']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}


mysqli_close($conn);
?>
