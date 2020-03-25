<?php
header('Content-type: text/html; charset=utf-8');
//ручная запись
$name = $email = $phone = $message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$name = check_input($_POST['name']);
$email = check_input($_POST['email']);
$phone = check_input($_POST['phone']);
$message = check_input($_POST['message']);
$nameForm = check_input($_POST['nameForm']);
}
function check_input($val) {
    $val = trim($val);
    $val = stripslashes($val);
    $val = htmlspecialchars($val);
    // $val = json_decode($val);
    // $val = json_encode($val); // если dataType: 'json', можно удалить ,но в ajax поставить в dataType: 'text',
    return $val;
}
$time = date('Y-m-d H:i:s');
$file = "text/text.txt";
$Saved_File = fopen($file, 'a+');

if (!empty($name) && !empty($email) && !empty($phone)){
    $doc = "\n
    $time
    ФИО: $name
    Телефон: $phone
    email: $email
    Сообщение: $message
    Имя формы: $nameForm
    ";
fwrite($Saved_File, $doc);
}
fclose($Saved_File);
?>