<?php
require_once __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

function send_activation_email(string $email): void
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
    $mail->Subject = "no-reply: Exam Management email verification";
    $mail->Body = <<<MESSAGE
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Verification Email</title>
        <style>
          #content {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333333 !important;
            background-color: #caf0f8;
            padding: 20px;
            border-radius: 10px;
            background-image: linear-gradient(to right bottom, #0077b6,#03045e);
        color:white !important;
          }
          
          #content  h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }
          
          #content p {
            margin-bottom: 10px;
          }
          
          #content strong {
            color: #000000;
          }
          
          #content #verification-id{
            background-color: skyblue;
            color: black;
            padding: 5px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
      <div id="content">
        <h1>Verify your email address</h1>
        <p>Thank you for signing up for our service. To complete your registration, please verify your email address by click on the Activation Link:</p>
        <p><b>Verification Link:</b> <a href=""><span id="verification-id">Click Here</span></a></p>
        <p>Thank you,</p>
        <p>Exam Coordinator</p>
        </div>
      </body>
    </html>
    MESSAGE;
    // Send the email
    if (!$mail->send()) {
        echo 'Error sending email: ' . $mail->ErrorInfo;
    } else {
        echo 'Email sent successfully!';
    }
}

?>