<?php

use Slim\Factory\AppFactory;
use Predis\Client;
use Predis\Command\Redis\ECHO_;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Configure Redis connection
$redisConfig = [
    'scheme' => 'tcp',
    'host' => '127.0.0.1', //Redis server IP
    'port' => 6379,         //Redis server port
];

$redis = new Client($redisConfig);

$app->post('/addnotification', function ($request, $response, $args) use ($redis) {
    $data = $request->getParsedBody();

    $conditionValid = empty($data['description']) || empty($data['assignee']) || empty($data['due_date']) || empty($data['title']);
    if ($conditionValid) {
        $responseData = ['error' => 'Missing required fields.'];
        return $response->withJson($responseData, 400);
    }

    $notification = [
        'description' => $data['description'],
        'assignee' => $data['assignee'],
        'title' => $data['title'],
    ];

    $notificationJson = json_encode($notification);

    if ($notificationJson === false) {
        $responseData = ['error' => 'Failed to encode notification as JSON.'];
        return $response->withJson($responseData, 500); 
    }

    $due_date = $data['due_date'];
    $redis->rpush($due_date, [$notificationJson]);

    $responseData = ['message' => 'Notification added successfully.'];
    return $response->withJson($responseData, 200);
});

$app->get('/getnotifications/{assignee}', function ($request, $response, $args) use ($redis) {
    $assignee = $args['assignee'];
    $notifications = $redis->lrange($assignee, 0, -1);

    $filteredNotifications = [];
    foreach ($notifications as $notificationJson) {
        $notification = json_decode($notificationJson, true);
        $notificateDate = $notification['due_date'];
        $notificateDate = date("d-m-Y", strtotime($notificateDate));
        $currentDate=date("d-m-Y");
        $diff=date_diff(date_create($notificateDate),date_create($currentDate));
        echo $diff->format("%R%a");
        echo "\n";
        $filteredNotifications[] = $notification;
    }

    return $response->withJson($filteredNotifications, 200);
});

$app->run();