<?php

//mail to user

$name       = @trim(stripslashes($_POST['name'])); 
$user       = @trim(stripslashes($_POST['email'])); 
$subject    = @trim(stripslashes($_POST['subject'])); 
$message    = @trim(stripslashes($_POST['message'])); 
$admin 		= 'admin@arkayaventure.co.uk';

$thanks = 'Hi '.$name.'<br/><br/>Thanks for contacting us. We have received your mail. We will contact soon.<br/><br/>Thanks';
$subject = 'Contact - Arkaya ventures Limited';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: ' .$admin. "\r\n";

mail($user, $subject, $thanks, $headers);

$thanks = 'Hi Admin,<br/><br/>We have received the mail from customer.<br/><br/><strong>Customer Details:</strong><br/><br/>Name: '.$name.'<br/><br/>Email id: '.$user.'<br/><br/>Subject: '.$subject.'<br/><br/>Message: '.$message.'<br/><br/>Thanks';
$subject = 'Request from Customer';
echo $message
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: ' .$user. "\r\n";

mail($admin, $subject, $thanks, $headers);

die;