$(document).ready(function(){

	// upload initialization
	if($('input[type="file"]').length){
		upload.init();
	}

	// slider initialization
	if($('.b-opacity-slider').length){
		wmarkOpacity.init();
	}

	// switchers initialization
	if($('.b-switchers').length){
		switchPattern.init();
	}

	// disable location
	if($('.b-location').length){
		wmarkPosition.disable();
	}

	// translate initialization
	if($('.b-language').length){
		translate.init();
	}

	// share initialization
	if($('.b-share').length){
		share.init();
	}

	// form initialization
	if($('.b-form').length){
		form.init();

		// placeholder initialization
		$('.b-input').placeholder();

		// disable form buttons
		$('.m-btns input').prop('disabled', true);
	}

});
