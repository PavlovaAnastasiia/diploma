<?php
// читаем json файл
$json = file_get_contents('../goods.json');
$json = json_decode($json, true); //декодируем

//письмо
$message = '';
$message .= '<h1>Заказ в магазине "TeddyToys"</h1>';
$message .='<p>Телефон: '.$_POST['ephone'].'</p>';
$message .='<p>Почта: '.$_POST['email'].'</p>';
$message .='<p>Клиент: '.$_POST['ename'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id=>$count) {
    $message .=$json[$id]['name'].' -- ';
    $message .=$count.' -- ';
    $message .=$count*$json[$id]['cost'];
    $message .='<br>';
    $sum = $sum +$count*$json[$id]['cost'];
}
$message .='Всего: '.$sum;
print_r($message);

$to = 'nastyap968@gmail.com'.','; //представим, что это почта магазина
$to .=$_POST['email']; //письмо копируется пользователю
$spectext = '<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Заказ в магазине "TeddyToys"', $spectext.$message.'</body></html>', $headers);
if ($m == true) {echo 1;} else {echo 0;}  
