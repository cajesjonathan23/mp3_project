<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

include('mp3_db.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

  http_response_code(200);
  exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  $data = json_decode(file_get_contents('php://input'));
  $announcementId = $data->announcementId;

  if (!is_numeric($announcementId)) {
    $response = [
      'success' => false,
      'message' => 'Invalid announcement ID',
    ];
    http_response_code(400); 
    echo json_encode($response);
    exit;
  }

 
  $sql = "DELETE FROM anouncements_tbl WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $announcementId);

  if ($stmt->execute()) {
   
    $response = [
      'success' => true,
      'message' => 'Announcement deleted successfully',
    ];
    echo json_encode($response);
  } else {
 
    $response = [
      'success' => false,
      'message' => 'Error deleting announcement',
    ];
    http_response_code(500);
    echo json_encode($response);
  }

  
  $stmt->close();
  $conn->close();
} else {
 
  $response = [
    'success' => false,
    'message' => 'Invalid request method',
  ];
  http_response_code(405); 
  echo json_encode($response);
}
?>
