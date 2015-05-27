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
			intervals = $('.b-intervals'),
			hidden = $('.m-hidden-switch'),
			inputWrap = $('.b-controls');

		if (el.data('switch') === 'single') {
			if (intervals.length) {
				intervals.remove();
				dragDrop.toggle('single');
			}
			hidden.val('single');
		} else {
			if (!intervals.length) {
				blockLocation.prepend('<div class="b-intervals"><div class="b-interval m-hor" /><div class="b-interval m-vert" />');
				dragDrop.toggle('multi');
			}
			hidden.val('multi');
		}

		// check input mode
		if (inputWrap.hasClass('m-for-multi')) {
			inputWrap.removeClass('m-for-multi');
		} else {
			inputWrap.addClass('m-for-multi');
		}

		// check icon mode
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