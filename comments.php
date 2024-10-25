<?php
$servername = "localhost"; // Your server name
$username = "your_db_username"; // Your database username
$password = "your_db_password"; // Your database password
$dbname = "commentsDB"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comment = $_POST['comment'];
    $sql = "INSERT INTO comments (comment, created_at) VALUES ('$comment', NOW())";
    $conn->query($sql);
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM comments");
    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    echo json_encode($comments);
}

$conn->close();
?>