$(document).ready(function(){

	// upload initialization
	if($('input[type="file"]').length){
		upload.init();
	}

	// slider initialization
	if($('.b-opacity-slider').length){
		wmarkOpacity.init();
	}

	// form and placeholder initialization
	if($('.b-form').length){
		$('.b-input').placeholder();
		form.init();
	}

	// switchers initialization
	if($('.b-switchers')){
		switchPattern.init();
	}

	// disable location
	if($('.b-location')){
		wmarkPosition.disable();
	}

	// disable form btns
	$('.m-btns input').prop('disabled', true);

	$('.b-share').on('click', function(){
		var e = $(this);
		if (e.hasClass('m-opened')) {
			$('.b-share-icon').animate({'right':'0px'});
			$('.b-share-socials-list').animate({'width':'0px'}, function(){
				e.toggleClass('m-opened');
			});
		} else {
			$('.b-share-icon').animate({'right':'-43px'});
			$('.b-share-socials-list').animate({'width':'43px'}, function(){
				e.toggleClass('m-opened');
			});
		}
	});
});
