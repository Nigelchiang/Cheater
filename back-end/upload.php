<?php
/**
 * Created by PhpStorm.
 * User: Nigel
 * Date: 2016/2/1
 * Time: 2:22
 * Description:Cheater extension 后端代码
 */
$files = $_FILES['cheater'];

//多文件上传用PHP接收
//如果没出错，则$files["error"]就是包含文件个数个0的数组
$db = new mysqli(SAE_MYSQL_HOST_M . ':' . SAE_MYSQL_PORT, SAE_MYSQL_USER, SAE_MYSQL_PASS, SAE_MYSQL_DB);

sae_log($db->connect_error . "connect" . $db->error);


$db->set_charset('utf8');
$stmt = $db->prepare("INSERT INTO cheater(filename,file) VALUES(?,?)") or sae_log($db->error);

$respose = array();

for ($i = 0; $i < count($files["error"]); ++$i) {
    $filename = htmlspecialchars(trim($files["name"][$i]));

    sae_log("filename" . $filename);

    $respose[$i]['file']  = $filename;
    $respose[$i]['error'] = '';
    $flag                 = true;
    if ($files['size'][$i] / 1024 > 2000) {
        $respose[$i]['error'] .= "File is too big";
        $flag = false;
    }

    if ($files['error'][$i] !== 0) {
        $respose[$i]['error'] .= "\n" . $files['error'][$i];
        $flag = false;
    }

    if ($flag) {
        $file = addslashes(file_get_contents($files["tmp_name"][$i]));
        foreach (str_split($file, 20000) as $piece) {

            $stmt->bind_param("ss", $filename, $piece) or sae_log($stmt->error);

            $stmt->execute()
            or $respose[$i]["error"] .= "\n{$stmt->errno}:{$stmt->error}";
        }
    }

}
echo json_encode($respose);

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