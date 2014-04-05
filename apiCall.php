<?php
$filename=$_GET['file'];
$AccessCode=$_GET['AccessCode'];
get_URL($filename,$AccessCode);
function getContentFromURL($url,$arguments)   //passing url and args as params
{
$url=$url.'?file='.$arguments[0].'&access_token='.$arguments[1];
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,5);
$content = curl_exec($ch);

$requestStatus=curl_getinfo($ch,CURLINFO_HTTP_CODE);  //get status code for 503 errors
if($requestStatus==503)
{

  $content="{error:503}";
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

if(checkTimeStamp($filePath))     //if cache time beyond one day
{    //  echo("CACHE TIME EXPIRED");
    $content=getContentFromURL($base_url,$arguments);
   if($content!="{error:503}")
    saveToFile($filePath,$content);

}
  else
  {
      $content=file_get_contents($filePath);     //else if file read before 24 hours read from file
  // echo("READ FRIM FILE");

  }
}
 else
 {
     $content=getContentFromURL($base_url,$arguments);
     saveToFile($filePath,$content);
 }
processContent($content,$base_url,$arguments);
}

function saveToFile($filePath,$content)
{
    file_put_contents($filePath,$content);


}
function processContent($content,$url,$arguments)
{
 if($content=="{error:503}")
 { $content=getContentFromURL($url,$arguments);
     $json=json_decode($content,true);
     echo $content;}
else
{
 $json=json_decode($content,true);
    $i=0;


    echo $content;     //pass json as return
}

}

function checkTimeStamp($filePath)
{
    $cacheTime =(24*60*60);            //cache time of one day
    $LastModified=filemtime($filePath) + $cacheTime;
   if($LastModified<time())
       return true;
    else
        return false;

}

?>