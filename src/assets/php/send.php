<?php
if ( isset($_POST["name"])) {
    $name = check_input($_POST["name"]);
}
if ( isset($_POST["email"]) ) {
    $email = check_input($_POST["email"]);
}
if ( isset($_POST["phone"]) ) {
    $phone = check_input($_POST["phone"]);
}
if ( isset($_POST["message"]) ) {
    $message = check_input($_POST["message"]);
}
if ( isset($_POST["nameForm"]) ) {
    $nameForm = check_input($_POST['nameForm']);
}

function check_input($data) {
    $data = htmlspecialchars($data);
    $data = stripslashes($data);
    $data = urldecode($data);
    $data = trim(strip_tags($data));
    return $data;
}

// $EmailTo = "ludmila.egorova@utsrus.com,ivan.podenko@utsrus.com";
$EmailTo = "oleg.orlov@utsrus.com";
$Subject = "$nameForm";

// prepare email body text
$Body ='<html>
	<head><title>'.$Subject.'</title></head>
    <body>
		<p>Имя: '.$name.'</p>
		<p>Телефон: '.$phone.'</p>
		<p>email: '.$email.'</p>
		<p>Сообщение: '.$message.'</p>
	</body>
</html>';
	$header = "Content-type: text/html; charset=utf-8 \r\n";
	$header .= "From:".$email."\n\n";
// send email
$send = mail($EmailTo, $Subject, $Body, $header);

?>