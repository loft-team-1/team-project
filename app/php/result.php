<?php
	ini_set("memory_limit", "1024M");

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
	$backgroundColor = $ffffff; // transparent, only for PNG (otherwise it will be white if set null)
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
	$image = ImageWorkshop::initFromPath('./files/'.$filename); // Get new layer

	// Check resized image size
	$maxWidth = 650;
	$maxHeight = 534;

	if ($image->getWidth() > $maxWidth) {
		$image->resizeInPixel($maxWidth, null, true);
	}
	if ($image->getHeight() > $maxHeight) {
		$image->resizeInPixel(null, $maxHeight, true);
	}

	// Check which layout to use
	$mode = $_POST['mode'];

	if ($mode === 'single') {
		// Adding watermark
		$image->addLayerOnTop($watermark, $xpos, $ypos, 'LT'); // Add watermark to basic layer

	} else if ($mode === 'multi') {

		$watermarkImage = imageCreateFromAny('./files/'.$_POST['waterMark']);

		// Getting watermark dimensions
		$watermarkImageX = ImageSX($watermarkImage);
		$watermarkImageY = ImageSY($watermarkImage);

		// Creating transparent image which will be tiled with watermarks
		$patternWidth = $_POST['patternWidth'];
		$patternHeight = $_POST['patternHeight'];
		$patternBg = null; // optionnal, can be null to transparent

		$patternResource = ImageWorkshop::initVirginLayer($patternWidth, $patternHeight, $patternBg);

		// Tiling start coordinates
		$horizontalCoord = 0;
		$verticalCoord = 0;

		// Tiling cycle
		while ($horizontalCoord < $patternWidth && $verticalCoord < $patternHeight){

			$patternResource->addLayerOnTop($watermark, $horizontalCoord, $verticalCoord, 'LT');

			$horizontalCoord += $watermarkImageX+$xpos;
			if ($horizontalCoord >= $patternWidth){
				$horizontalCoord = 0;
				$verticalCoord += $watermarkImageY+$ypos;
			}
		}

		// Set coordinates to it's original state
		$xposMulti = $_POST['xposMulti'];
		$yposMulti = $_POST['yposMulti'];

		// Adding watermark pattern
		$image->addLayerOnTop($patternResource, $xposMulti, $yposMulti, 'LT'); // Add watermark to basic layer
	}

	// Result image
	$filename = "result.jpg";
	$image->save($dirPath, $filename, $createFolders, $backgroundColor, $imageQuality);

	// Send to ajax
	echo __DIR__ . "/files/" . $filename;
	exit;


	// Get type of watermark
	function imageCreateFromAny($filepath) {
		$type = exif_imagetype($filepath);
		$allowedTypes = array(
			1,  // [] gif
			2,  // [] jpg
			3,  // [] png
			6   // [] bmp
		);
		if (!in_array($type, $allowedTypes)) {
			return false;
		}
		switch ($type) {
			case 1 :
				$im = imageCreateFromGif($filepath);
				break;
			case 2 :
				$im = imageCreateFromJpeg($filepath);
				break;
			case 3 :
				$im = imageCreateFromPng($filepath);
				break;
			case 6 :
				$im = imageCreateFromBmp($filepath);
				break;
		}
		return $im;
	}