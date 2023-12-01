<?php

require_once __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;

$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();

$channel->queue_declare('hello', true, false, false, false);

echo " [*] Waiting for messages. To exit press CTRL+C\n";

while (true) {
    $message = $channel->basic_get('hello', true); // Get a single message and acknowledge it

    if ($message) {
        echo ' [x] Received ', $message->body, "\n";
    } else {
        echo " [x] No messages found. Waiting...\n";
        break;
    }
}

$channel->close();
$connection->close();
