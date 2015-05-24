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
    // Check which layout to use
    $layout = $_POST['data-switch'];
    if ($layout === 'single') {
        // Adding watermark
        $image->addLayerOnTop($watermark, $xpos, $ypos, 'LT'); // Add watermark to basic layer
        // Result image
        $filename = "result.jpg";
        $image->save($dirPath, $filename, $createFolders, $backgroundColor, $imageQuality);
        // Send to ajax
        echo __DIR__ . "/files/" . $filename;
        exit;
    }
    // If layout is tiled
    else if ($layout === 'multi') {
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

        $watermarkImage = imageCreateFromAny('./files/'.$_POST['waterMark']);

        // Getting watermark dimensions
        $watermarkImageX = ImageSX($watermarkImage);
        $watermarkImageY = ImageSY($watermarkImage);

        // Creating transparent image which will be tiled with watermarks
        $patternResource = imagecreatetruecolor(1000, 1000);
        $red = imagecolorallocate($patternResource, 255, 0, 0);
        $black = imagecolorallocate($patternResource, 0, 0, 0);
        imagecolortransparent($patternResource, $black);
        imagepng($patternResource, './files/temp-pattern.png');
        $patternResource = ImageWorkshop::initFromPath('./files/temp-pattern.png'); // Set this image as a plugin object

        // Tiling start coordinates
        $horizontalCoord = 0;
        $verticalCoord = 0;

        // Tiling cycle
        while ($horizontalCoord < 1000 && $verticalCoord < 1000){

            $patternResource->addLayerOnTop($watermark, $horizontalCoord, $verticalCoord, 'LT');

            $horizontalCoord += $watermarkImageX+$xpos;
            if ($horizontalCoord >= 1000){
                $horizontalCoord = 0;
                $verticalCoord += $watermarkImageY+$ypos;
            }
        }

        // Set coordinates to it's original state
        $xpos = $_POST['xpos'];
        $ypos = $_POST['ypos'];

        // Adding watermark pattern
        $image->addLayerOnTop($patternResource, $xpos, $ypos, 'LT'); // Add watermark to basic layer

        // Result image
        $filename = "result.jpg";
        $image->save($dirPath, $filename, $createFolders, $backgroundColor, $imageQuality);

        // Send to ajax
        echo __DIR__."/files/".$filename;
        exit;
    }