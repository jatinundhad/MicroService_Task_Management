<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Predis\Client;
use Slim\Http\Response as Response;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Configure Redis connection
$redisConfig = [
    'scheme' => 'tcp',
    'host' => '127.0.0.1', // Change to your Redis server IP
    'port' => 6379,         // Change to your Redis server port
];

$redis = new Client($redisConfig);

$app->post('/addnotification', function ($request, $response, $args) use ($redis) {
    // Parse the JSON request body
    $data = $request->getParsedBody();

    // Validate the incoming data
    $conditionValid = empty($data['description']) || empty($data['assignee']) || empty($data['due_date']) || empty($data['title']);
    if ($conditionValid) {
        $responseData = ['error' => 'Missing required fields.'];
        return $response->withJson($responseData, 400);
    }

    // Create the notification data
    $notification = [
        'description' => $data['description'],
        'assignee' => $data['assignee'],
        'due_date' => $data['due_date'],
        'title' => $data['title'],
    ];

    // JSON-encode the notification data
    $notificationJson = json_encode($notification);

    if ($notificationJson === false) {
        // JSON encoding failed
        $responseData = ['error' => 'Failed to encode notification as JSON.'];
        return $response->withJson($responseData, 500); // 500 Internal Server Error
    }

    // Use the 'assignee' as the Redis key and push the JSON-encoded notification to the corresponding list
    $assigneeKey = $data['assignee'];
    $redis->rpush($assigneeKey, [$notificationJson]);

    // Respond with a success message
    $responseData = ['message' => 'Notification added successfully.'];
    return $response->withJson($responseData, 200);
});


$app->get('/getnotifications/{assignee}', function ($request, $response, $args) {
    global $redis;
    $assignee = $args['assignee'];
    $notifications = $redis->lrange('notifications', 0, -1);

    $filteredNotifications = [];
    foreach ($notifications as $notificationJson) {
        $notification = json_decode($notificationJson, true);
        if ($notification['assignee'] === $assignee) {
            $filteredNotifications[] = $notification;
        }
    }
    return $response->withJson($filteredNotifications, 200);
});

$app->run();