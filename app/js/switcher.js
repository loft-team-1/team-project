var switchPattern  = (function(){

	// set variables
	var switchers = $('.b-switcher'),
		blockLocation =$('.b-location');

	var init = function(){
		_setupListeners();
	},

	// set listeners
	_setupListeners = function(){
		if (switchers.length) {
			switchers.on('click touchstart', function(e) {
				(e.preventDefault) ? e.preventDefault(): e.returnValue;
				changePattern($(this));
			});
		}
	},

	// change mode: multi or single
	changePattern = function(elem){

		wmarkPosition.reset();
		wmarkOpacity.reset();
		upload.reset();

		var el = elem || $(this),
			intervals = $('.b-intervals');

		if (el.data('switch') === 'single') {

			if (intervals.length) {
				intervals.remove();
				dragDrop.toggle('single');
			}

			$('.m-hidden-switch').val('single');

			if ($('.b-controls').hasClass('m-for-multi')) {
				$('.b-controls').removeClass('m-for-multi');
				$('.m-vertical').html('X');
				$('.m-horizontal').html('Y');
			}

		} else {

			if (!intervals.length) {
				blockLocation.prepend('<div class="b-intervals"><div class="b-interval m-hor" /><div class="b-interval m-vert" />');
				dragDrop.toggle('multi');
			}

			$('.m-hidden-switch').val('multi');

			if (!$('.b-controls').hasClass('m-for-multi')) {
				$('.b-controls').addClass('m-for-multi');
				$('.b-control-tip').html('&nbsp;');
			}
		}

		if (!(el.hasClass('m-active'))) {
			el.addClass('m-active');
			el.siblings('.m-active').removeClass('m-active');
		}


	};

	return {
		init: init,
		change: changePattern
	}

})();