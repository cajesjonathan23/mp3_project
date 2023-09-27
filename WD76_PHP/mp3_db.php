<?php
header('Access-Control-Allow-Origin: *');

$server = 'localhost';
$username = 'root';
$password = '';
$db = 'mp3_db';
$method = $_SERVER['REQUEST_METHOD'];
$conn = mysqli_connect($server,$username,$password,$db);

// if($conn){
//     echo "Connected Successfully";
// }

if($method == "POST") {
    $function = $_POST['function'];
    if($function ==1){
        $fullname = $_POST['fullname'];
        $email = $_POST['email'];
        $pass = $_POST['password'];

        $sql = "INSERT INTO users_tbl (fullname, email, pass) VALUES ('$fullname', '$email', '$pass')";
        $result = mysqli_query($conn, $sql);
    }else if ($function == 2) {
        $name = $_POST['name'];
        $location = $_POST['address'];
        $title = $_POST['title'];
        $desc = $_POST['description'];
        $selectedType = $_POST['type'];
        $userEmail = $_POST['email'];
    
        // Get the current date and time
        $currentDate = date('Y-m-d H:i:s');
    
        if (isset($_FILES['file'])) {
            $file = $_FILES['file'];
    
            $uploadDir = 'your_upload_directory/';
            $uploadedFile = $uploadDir . basename($file['name']);
    
            if (move_uploaded_file($file['tmp_name'], $uploadedFile)) {
                // File uploaded successfully
            } else {
                echo "File upload failed.";
            }
        }
    
        // Insert data into the database, including the current date
        $sql = "INSERT INTO reports_tbl (name, location, title, description, type, image, date, email) 
                VALUES ('$name', '$location', '$title', '$desc', '$selectedType', '$uploadedFile', '$currentDate', '$userEmail' )";
        $result = mysqli_query($conn, $sql);
    
        if ($result) {
            echo "Report submitted successfully.";
        } else {
            echo "Error submitting report: " . mysqli_error($conn);
        }
    }
    
    else if ($function == 3) {
       
        $sql = "SELECT COUNT(*) AS user_count FROM users_tbl";
        $result = mysqli_query($conn, $sql);

        if ($result) {
            $row = mysqli_fetch_assoc($result);
            $userCount = $row['user_count'];
            echo json_encode(['user_count' => $userCount]);
        } else {
            echo json_encode(['error' => 'Unable to count users']);
        }
    }else if ($function == 4) {
       
        $sql = "SELECT COUNT(*) AS report_count FROM reports_tbl";
        $result = mysqli_query($conn, $sql);

        if ($result) {
            $row = mysqli_fetch_assoc($result);
            $reportCount = $row['report_count'];
            echo json_encode(['report_count' => $reportCount]);
        } else {
            echo json_encode(['error' => 'Unable to count reports']);
        }
    }
    else if ($function == 5) { 
        // Query to count announcements
        $sql = "SELECT COUNT(*) AS announcement_count FROM anouncements_tbl";
        $result = mysqli_query($conn, $sql);
    
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            $announcementCount = $row['announcement_count'];
            echo json_encode(['announcement_count' => $announcementCount]);
        } else {
            echo json_encode(['error' => 'Unable to count announcements']);
        }
    }
    else if($function == 6){
        $title = $_POST['title'];
        $description = $_POST['description'];

        if (isset($_FILES['file'])) {
            $file = $_FILES['file'];

      
        $uploadDir = 'your_upload_directory/';
        $uploadedFile = $uploadDir . basename($file['name']);

        if (move_uploaded_file($file['tmp_name'], $uploadedFile)) {
           
        } else {
            echo "File upload failed.";
        }
    }


    $sql = "INSERT INTO anouncements_tbl (title, description, image) VALUES ('$title', '$description', '$uploadedFile')";
        $result = mysqli_query($conn, $sql);
    }
    
    
    
   
}

?>