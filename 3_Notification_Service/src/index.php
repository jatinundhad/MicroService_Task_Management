<?php
require __DIR__ . '/../vendor/autoload.php';
require_once 'mail/sendmail.php';

use Slim\Factory\AppFactory;
use Predis\Client;
use Slim\Exception\HttpNotFoundException;

$app = AppFactory::create();
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Configure Redis connection
$redisConfig = [
    'scheme' => 'tcp',
    'host' => '127.0.0.1', //Redis server IP
    'port' => 6379,         //Redis server port
];

$redis = new Client($redisConfig);

$app->post('/addnotification', function ($request, $response, $args) use ($redis) {
    $data = $request->getParsedBody();

    $conditionValid = empty($data['description']) || empty($data['assignee']) || empty($data['duedate']) || empty($data['title']);
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

    $due_date = $data['duedate'];
    $redis->rpush($due_date, [$notificationJson]);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://localhost:5000/auth/search/' . $notification['assignee']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $res = curl_exec($ch);
    $res = json_decode($res, true);
    if (curl_errno($ch)) {
        echo 'cURL error: ' . curl_error($ch);
    }
    echo $res['email'];
    send_activation_email($res['email']);
    curl_close($ch);

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
        $currentDate = date("d-m-Y");
        $diff = date_diff(date_create($notificateDate), date_create($currentDate));
        echo $diff->format("%R%a");
        echo "\n";
        $filteredNotifications[] = $notification;
    }

    return $response->withJson($filteredNotifications, 200);
});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
    throw new HttpNotFoundException($request);
});

$app->run();