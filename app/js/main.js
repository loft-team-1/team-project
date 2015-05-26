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

	switchPattern.init();

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
