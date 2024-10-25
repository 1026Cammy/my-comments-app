<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "fdb1034.awardspace.net"; // Your server name, often 'localhost'
$username = "4395505_commentsdb"; // Your database user
$password = "Poiuytrewq1!"; // Your database password
$dbname = "4395505_commentsdb"; // Your database name

$expected_password = '6969646464'; // Set your password here

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SERVER['PHP_AUTH_USER']) || $_SERVER['PHP_AUTH_PW'] !== $expected_password) {
        header('WWW-Authenticate: Basic realm="Restricted Area"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Unauthorized';
        exit;
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
    while($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    echo json_encode($comments);
}

$conn->close();
?>
