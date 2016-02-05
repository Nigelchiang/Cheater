<?php
/**
 * Created by PhpStorm.
 * User: Nigel
 * Date: 2016/2/5
 * Time: 3:24
 */
$q = @addslashes(htmlspecialchars(trim($_POST["q"])));
//$filename = 'www.nigel.top.html';
//$file     = addslashes(file_get_contents($filename));


//$query = "INSERT INTO cheater(filename,file) VALUES('{$filename}','{$file}')";
$db = new mysqli(SAE_MYSQL_HOST_M . ':' . SAE_MYSQL_PORT, SAE_MYSQL_USER, SAE_MYSQL_PASS,
                 SAE_MYSQL_DB) or sae_log("new mysqli " . $db->error);
$db->set_charset('utf8');
$res = $db->query("SELECT file FROM cheater WHERE file REGEXP '{$q}'") or sae_log("query " . $db->error);
$db->close();

$output = '';
while ($text = $res->fetch_array()) {
    $output .= $text[0] . "<hr/>";
    //$text = stripslashes($text);
    //preg_match("|<p.*?{$q}.*?</p>|i", iconv(mb_detect_encoding($text), "UTF-8", $text), $output);
    //echo $output[0];
}

echo $output ? $output : "Nothing Found";

/**
 * @param $msg string
 *
 * @return string
 */
function sae_log($msg) {

    sae_set_display_errors(false);//关闭信息输出
    sae_debug($msg);//记录日志
    sae_set_display_errors(true);//记录日志后再打开信息输出，否则会阻止正常的错误信息的显示
    return $msg;
}