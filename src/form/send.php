<?php

define("WEBMASTER_EMAIL", 'oleg.orlov@utsrus.com');
$address = "oleg.orlov@utsrus.com";
if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");

$error = false;
$fields = array( 'name', 'email', 'message','phone' );

foreach ( $fields as $field ) {
	if ( empty($_POST[$field]) || trim($_POST[$field]) == '' )
		$error = true;
}

if ( !$error ) {

	$name = stripslashes($_POST['name']);
	$email = trim($_POST['email']);	
	$message = stripslashes($_POST['message']);
	$phone = stripslashes($_POST['phone']);	

	$e_subject = 'You\'ve been contacted by ' . $name . '.';

	$e_body = "You have been contacted by: $name" . PHP_EOL . PHP_EOL;
	$e_reply = "E-mail: $email" . PHP_EOL . PHP_EOL;
	$e_content = "Message:\r\n$message" . PHP_EOL . PHP_EOL;
	$e_phone = "\r\nWebsite: $phone" . PHP_EOL . PHP_EOL;

	$msg = wordwrap( $e_body . $e_reply , 70 );

	$headers = "From: $email" . PHP_EOL;
	$headers .= "Reply-To: $email" . PHP_EOL;
	$headers .= "Website: $phone" . PHP_EOL;
	$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
	$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

	if(mail($address, $msg, $headers, $e_content  )) {
		echo 'Почта отправлена';
	} else {
		echo 'Ошибка!';
	}
}
?>