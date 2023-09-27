<?php

require_once __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();

$channel->queue_declare('hello', true, false, false, false);

$msg1 = new AMQPMessage('Hello World!');
$msg2 = new AMQPMessage('Hello World2!');
$channel->basic_publish($msg1, '', 'hello');
$channel->basic_publish($msg2, '', 'hello');

echo " [x] Sent 'Hello World!'\n";

$channel->close();
$connection->close();

?>