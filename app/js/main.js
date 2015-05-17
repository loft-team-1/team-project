$(document).ready(function(){

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
		dragDrop.reset();
		wmarkOpacity.reset();
		upload.reset();
	});
});

