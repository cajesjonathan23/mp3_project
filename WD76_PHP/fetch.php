<?php
header('Access-Control-Allow-Origin: *');
include "mp3_db.php";

// if($conn){
//     echo "Connected Successfully";
// }
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $function = $_GET['function'];

    if ($function == 1) {
       
        $sql = "SELECT id, fullname, email FROM users_tbl"; 
        $result = mysqli_query($conn, $sql);

        if ($result) {
            $users = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $users[] = $row;
            }
            echo json_encode(['users' => $users]);
        } else {
            echo json_encode(['error' => 'Unable to fetch users']);
        }
    }
    if ($function == 2) {
        $sql = "SELECT id, name, location, title, description, type, date, image FROM reports_tbl";
        $result = mysqli_query($conn, $sql);
    
        if ($result) {
            $reports = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $file_content = $row['image'];
                
           
                $image_info = getimagesizefromstring($file_content);
                if ($image_info !== false) {
                    $mime_type = $image_info['mime'];
                    switch ($mime_type) {
                        case 'image/jpeg':
                            $row['image_extension'] = 'jpg';
                            break;
                        case 'image/png':
                            $row['image_extension'] = 'png';
                            break;
                        case 'image/gif':
                            $row['image_extension'] = 'gif';
                            break;
                     
                        default:
                           
                            $row['image_extension'] = 'jpg';
                            break;
                    }
                } else {
                   
                    $row['image_extension'] = 'jpg';
                }
                
                $row['image_content'] = base64_encode($file_content);
                $reports[] = $row;
            }
            echo json_encode(['reports' => $reports]);
            
        } else {
            echo json_encode(['error' => 'Unable to fetch reports']);
        }
    }
    
    if ($function == 3) {
      
        $sql = "SELECT id, title, description, date FROM anouncements_tbl";
        $result = mysqli_query($conn, $sql);
        if ($result) {
            $announcements = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $announcements[] = $row;
            }
            echo json_encode(['announcements' => $announcements]);
        } else {
            echo json_encode(['error' => 'Unable to fetch announcements']);
        }
        
    }
    if ($function == 4) {
        $email = $_GET['email']; 
        

        $sql = "SELECT id, name, location, title, description, type, date
                FROM reports_tbl
                WHERE email = '$email'";
    
        $result = mysqli_query($conn, $sql);
    
        if ($result) {
            $reports = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $reports[] = $row;
            }
            echo json_encode(['reports' => $reports]);
        } else {
            echo "Error: " . mysqli_error($conn); 
            echo json_encode(['error' => 'Unable to fetch reports']);
        }
    }
    
    

  

}

?>