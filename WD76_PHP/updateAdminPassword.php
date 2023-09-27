<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include "mp3_db.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data sent in the request
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->email) && isset($data->currentPassword) && isset($data->newPassword)) {
        $email = mysqli_real_escape_string($conn, $data->email);
        $currentPassword = mysqli_real_escape_string($conn, $data->currentPassword);
        $newPassword = mysqli_real_escape_string($conn, $data->newPassword);

        $sql = "SELECT * FROM admin_tbl WHERE email = '$email' AND pass = '$currentPassword'";
        $result = mysqli_query($conn, $sql);

        if ($result && mysqli_num_rows($result) === 1) {
       
            $updateSql = "UPDATE admin_tbl SET pass = '$newPassword' WHERE email = '$email'";
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

// Close the database connection
mysqli_close($conn);
?>
