<?php

// require_once __DIR__. '../../vendor/autoload.php';
require_once  '../mail/sendmail.php';
require_once '../../vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

use Predis\Client;
// Configure Redis
$redisConfig = [
    'scheme' => 'tcp',
    'host' => '127.0.0.1', //Redis server IP
    'port' => 6379,         //Redis server port
];

$redis = new Client($redisConfig);

$today = new DateTime();
$tomorrow = $today->modify('+1 day');
$tomorrowDate = $tomorrow->format('Y-m-d');
echo $tomorrowDate; // Outputs tomorrow's date in 'Y-m-d' format

$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();

$channel->queue_declare('email', true, false, false, false);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:5003/getnotifications/' . $tomorrowDate);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
$res = json_decode($res, true);
if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
}
// var_dump($res);
foreach ($res as $notification) {
    $emailData = [
        'to' => $notification['email'],
        'subject' => 'Task',
        'message' => 'This is a test email message.',
    ];
    // Convert email data to JSON
    $messageBody = json_encode($emailData);
    // Create a message
    $message = new AMQPMessage($messageBody);

    // Publish the message to the queue
    $channel->basic_publish($message, '', 'email');
    echo $emailData['to']." Sent email request\n";
    // send_activation_email($notification['email']);
}
curl_close($ch);
echo " [*] Waiting for email requests. To exit, press CTRL+C\n";

// Callback function to handle incoming messages
$callback = function ($message) {
    $emailData = json_decode($message->body, true);

    // Send the email using a library like PHPMailer or your email service of choice
    $to = $emailData['to'];
    $subject = $emailData['subject'];
    $message = $emailData['message'];
    send_activation_email($to);
    echo " [x] Email sent to $to\n";
};

// Set the callback function for incoming messages
$channel->basic_consume('email', '', false, false, false, false, $callback);

// Keep the consumer running
while (count($channel->callbacks)) {
    $channel->wait();
}

// Close the channel and the connection
$channel->close();
$connection->close();

?>