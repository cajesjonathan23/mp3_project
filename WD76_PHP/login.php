<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include "mp3_db.php";

// Check if the database connection was successful
if (!$conn) {
    die('Database connection failed: ' . mysqli_connect_error());
}

// login.php: Handle the login request
if ($method === 'GET' && isset($_GET['email']) && isset($_GET['pass'])) {
    $email = mysqli_real_escape_string($conn, $_GET['email']);
    $password = mysqli_real_escape_string($conn, $_GET['pass']);

    $sql = "SELECT * FROM users_tbl WHERE email = '$email' AND pass = '$password'";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) === 1) {
        echo json_encode(['status' => 'available']);
    } else {
        echo json_encode(['status' => 'unavailable']);
    }
} else {
    echo json_encode(['status' => 'failure', 'message' => 'Invalid request method']);
}

// Close the database connection
mysqli_close($conn);
?>
