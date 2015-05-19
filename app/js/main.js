$(document).ready(function(){
    if($('.b-location')){
        wmarkPosition.disable();
    }
	// upload initialization
	if($('input[type="file"]').length){
		upload.init();
	}

	// slider initialization
	if($('.b-opacity-slider').length){
		wmarkOpacity.init();
	}

	// placeholder initialization
	if($('form').length){
		$('.b-input').placeholder();
	}

	// form reset
	$('.b-form').on('reset', function(e){
		(e.preventDefault) ? e.preventDefault(): e.returnValue;
		wmarkPosition.reset();
		wmarkOpacity.reset();
		upload.reset();
	});
});