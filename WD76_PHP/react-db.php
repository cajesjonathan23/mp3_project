<?php
header("Access-Control-Allow-Origin: *");
$server = "localhost";
$username = "root";
$password = "";
$db = "kodego_db";
$method = $_SERVER['REQUEST_METHOD'];

$conn = mysqli_connect($server,$username,$password,$db);

if($method == "GET"){
    $sql = "SELECT * FROM student_tbl";
}
// if($conn){
//     echo "Connected ";
// }
if($method == "POST"){
    $function = $_POST['function'];
    if($function ==1){
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $batch = $_POST['batch'];

        $sql = "INSERT INTO student_tbl (student_fname, student_lname, student_batch) VALUES ('$fname', '$lname', '$batch')";
    }else if($function == 2){
        $id = $_POST['id'];
        $sql = "DELETE FROM student_tbl WHERE student_id = '$id'";
    }else if ($function == 3) {
        $id = $_POST['id'];
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $batch = $_POST['batch'];
    
        $sql = "UPDATE student_tbl SET student_fname = '$fname', student_lname = '$lname', student_batch = '$batch' WHERE student_id = '$id'";
    }
    
   
}

$result = mysqli_query($conn, $sql);

if($method == "GET"){
    echo "[";
    for($i = 0; $i < mysqli_num_rows($result); $i++){
        echo ($i > 0 ? ',' : "").json_encode(mysqli_fetch_object($result));
    }
    echo "]";
}

    // echo mysqli_num_rows($result);
   
   
?>