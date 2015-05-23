<?php

	// Include Library
	require_once './vendor/autoload.php';
	use PHPImageWorkshop\ImageWorkshop; // Use the namespace of ImageWorkshop

	// Get images
	$image = ImageWorkshop::initFromPath('./files/'.$_POST['basicImage']);
	$watermark = ImageWorkshop::initFromPath('./files/'.$_POST['waterMark']);

	// Settings
	$dirPath = './files/';
	$filename = "temp-image.jpg";
	$createFolders = false;
	$backgroundColor = '$ffffff'; // transparent, only for PNG (otherwise it will be white if set null)
	$imageQuality = 100; // useless for GIF, usefull for PNG and JPEG (0 to 100%)
	$watermarkOpacity = $_POST['opacity'];
	$xpos = $_POST['xpos'];
	$ypos = $_POST['ypos'];

	// Add opacity to watermark
	$watermark->opacity($watermarkOpacity);

	// Prepare image
	$image->save($dirPath, $filename, $createFolders, $backgroundColor, $imageQuality); // Convert basic layer to jpg

	// Resize
	$img = imagecreatefromjpeg('./files/temp-image.jpg');
	$resizeWidth = ImageSX($img);
	$resizeHeight = ImageSY($img);
	$image = ImageWorkshop::initFromPath('./files/'.$filename); // Get new layer

	// Find out which dimensions is bigger and resize
	if ($resizeWidth > $resizeHeight) {
		$image->resizeInPixel(650, null, true);
	} else if ($resizeWidth < $resizeHeight){
		$image->resizeInPixel(null, 534, true);
	}

	// Check resized image size
	if ($resizeWidth > 650) {
		$image->resizeInPixel(650, null, true);
	}
	if ($resizeHeight > 534) {
		$image->resizeInPixel(null, 534, true);
	}

	// Adding watermark
	$image->addLayerOnTop($watermark, $xpos, $ypos, 'LT'); // Add watermark to basic layer

	// Result image
	$filename = "result.jpg";
	$image->save($dirPath, $filename, $createFolders, $backgroundColor, $imageQuality);

	// Send to ajax
	echo __DIR__."/files/".$filename;
	exit;