$(document).ready(function(){
    if($('.b-location')){
        wmarkPosition.init();
    }
	// upload initialization
	if($('input[type="file"]').length){
		upload.init();
	}

	// slider initialization
	if($('.b-opacity-slider').length){
		wmarkOpacity.init();
	}

	// form reset
	$('.b-form').on('reset', function(){
		wmarkPosition.reset();
		wmarkOpacity.reset();
		upload.reset();
	});
});

