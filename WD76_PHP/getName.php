<?php
include "mp3_db.php";

$email = $_GET["email"];
$password = $_GET["password"];


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT fullname, email FROM users_tbl WHERE email = ? AND pass = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}


$stmt->bind_param("ss", $email, $password);


if ($stmt->execute()) {
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $fullname = $row["fullname"];
        $email = $row["email"];
        echo json_encode(["status" => "available", "fullname" => $fullname, "email" => $email]);
    } else {
        echo json_encode(["status" => "unavailable"]);
    }
} else {
    die("Execute failed: " . $stmt->error);
}


$stmt->close();
$conn->close();
?>
