<?php
require_once __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

function send_activation_email(string $email, $data): void
{
  // Create a new PHPMailer instance
  $mail = new PHPMailer();

  // Set the SMTP server details
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'jetanivishv@gmail.com';
  $mail->Password = 'uzspmjdpeieldfuh';
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;
  $mail->isHTML(true); // Enable HTML content
  // $mail->SMTPDebug = 2;

  // Set the email details
  // set email subject & body
  $mail->setFrom('jetanivishv@gmail.com');
  $mail->addAddress($email);
  $mail->Subject = "New Task Assigned : " . $data["title"] . " - Action Required";
  $tagButtons = '';


  foreach ($data['tags'] as $tag) {
    $tagButtons .= '<a href="#" class="button">' . $tag . '</a>&nbsp;';
  }

  $date =
    date('d-m-Y', strtotime($data['duedate']));


  $htmlContent = <<<HTML
    <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>New Task Allotment</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }

                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                h1 {
                  color: #333333;
                  margin-bottom: 20px;
                }

                p {
                  margin-bottom: 10px;
                  line-height: 1.6;
                }

                .task-details {
                  background-color: #f9f9f9;
                  padding: 15px;
                  border-radius: 5px;
                  margin-bottom: 20px;
                }

                .task-details p {
                  margin: 5px 0;
                }

                .task-details strong {
                  color: #333333;
                }

                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  text-decoration: none;
                  background-color: lightblue;
                  color: white !important;
                  font-weight: bold;
                  border-radius: 4px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>New Task Allotment</h1>
                <div class="task-details">
                  <p><strong>Description:</strong>{$data['description']}</p>
<p><strong>Due Date:</strong>{$date}</p>
<p><strong>Priority:</strong>{$data['priority']}</p>
<p><strong>Assigner:</strong>{$data['assigner']}</p>
</div>
<p>
    You have been assigned a new task. Please review the details and start working on it accordingly.
</p>
<p>
$tagButtons
</p>
<p>Thank you,</p>
<p>Task Manager</p>
</div>
</body>

</html>
HTML;
  $mail->Body = $htmlContent;

  // Send the email
  if (!$mail->send()) {
    echo 'Error sending email: ' . $mail->ErrorInfo;
  } else {
    echo 'Email sent successfully!';
  }
}