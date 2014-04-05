<?php
$filename=$_GET['file'];
$AccessCode=$_GET['AccessCode'];
get_URL($filename,$AccessCode);
function getContentFromURL($url,$arguments)
{
$url=$url.'?file='.$arguments[0].'&access_token='.$arguments[1];
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,5);
$content = curl_exec($ch);

$requestStatus=curl_getinfo($ch,CURLINFO_HTTP_CODE);
if($requestStatus==503)
{

  $content="error";
   /* echo("503 occured");
    curl_close($ch);
    getContentFromURL($url,$arguments);*/
}

curl_close($ch);
return $content;

}

function get_URL($filename ,$AccessCode)
{

$base_url =   "http://rack1.citizennet.com/interviewtest/api";
$arguments=array($filename ,$AccessCode,);
$filePath="Cache/posts.txt";
if(file_exists($filePath))
{

if(checkTimeStamp($filePath))
{    //  echo("CACHE TIME EXPIRED");
    $content=getContentFromURL($base_url,$arguments);
   if($content!="error")
    saveToFile($filePath,$content);

}
  else
  {
      $content=file_get_contents($filePath);
  // echo("READ FRIM FILE");

  }
}
 else
 {
     $content=getContentFromURL($base_url,$arguments);
     saveToFile($filePath,$content);
   //  echo("FILE CREATED");
 }
processContent($content,$base_url,$arguments);
}

function saveToFile($filePath,$content)
{
    file_put_contents($filePath,$content);


}
function processContent($content,$url,$arguments)
{
 if($content=="error")
 { $content=getContentFromURL($url,$arguments);}
else
{
 $json=json_decode($content,true);
    $i=0;
    var_dump($json);
    // var_dump($json['data'][0]['from']);
     /*  foreach( $json['data'][$i] as $item) {
         $item['']
        $i=$i+1;
    }*/
    echo $content;
}

}

function checkTimeStamp($filePath)
{
    $cacheTime =(10);
    $LastModified=filemtime($filePath) + $cacheTime;
   if($LastModified<time())
       return true;
    else
        return false;

}

?>
