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
    'host' => 'redis', //Redis server IP
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
var_dump($res);

if ($res == NULL) exit("Exiting the script at this point.");

if (curl_errno($ch)) {
    echo 'cURL error: ' . curl_error($ch);
}

$data = [];
$data["title"] = "Reminder For Your Task";
$data["description"] = "Already given to you";
$data["priority"] = "urgent Basis";
$data["assigner"] = "By Admin";
$data["duedate"] = $tomorrowDate;
$data["tags"] = [];

foreach ($res as $notification) {
    $emailData = [
        'to' => $notification['email'],
        'subject' => 'Task',
        'message' => 'This is a test email message.',
    ];

    $messageBody = json_encode($emailData);

    $message = new AMQPMessage($messageBody);

    $channel->basic_publish($message, '', 'email');
    echo $emailData['to'] . " Sent email request\n";
    send_activation_email($notification['email'], $data);
}
curl_close($ch);
echo " [*] Waiting for email requests. To exit, press CTRL+C\n";

$callback = function ($message) {
    $emailData = json_decode($message->body, true);

    $to = $emailData['to'];
    $subject = $emailData['subject'];
    $message = $emailData['message'];
    send_activation_email($to, "");
    echo " [x] Email sent to $to\n";
};

$channel->basic_consume('email', '', false, false, false, false, $callback);

while (count($channel->callbacks)) {
    $channel->wait();
}

$channel->close();
$connection->close();