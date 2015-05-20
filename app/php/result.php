<?php

//checking that error display is on
error_reporting(E_ALL | E_STRICT);
if (ini_get('display_errors') != 1) {
  ini_set('display_errors', 1);
};



// Include Library
require_once './vendor/autoload.php';
use PHPImageWorkshop\ImageWorkshop; // Use the namespace of ImageWorkshop

// Load image and watermark

$imageBase = ImageWorkshop::initFromPath('./files/'.$_POST['basicImage']);
$imageBase->resizeInPixel(650, 534);

$xpos = $_POST['xpos'];
$ypos = $_POST['ypos'];

$wmarkImage = ImageWorkshop::initFromPath('./files/'.$_POST['waterMark']);
$wmarkOpacity = $_POST['opacity'];
$wmarkImage->opacity($wmarkOpacity);



$imageBase->addLayerOnTop($wmarkImage, $xpos, $ypos, 'LT');



$dirPath = "./files/result";
$filename = "result.jpg";
$createFolders = false;
$backgroundColor = null; // transparent, only for PNG (otherwise it will be white if set null)
$imageQuality = 100; // useless for GIF, usefull for PNG and JPEG (0 to 100%)
  
$imageBase->save($dirPath, $filename, $createFolders, $backgroundColor, $imageQuality);

?>






