var switchPattern  = (function(){

	var switchers = $('.b-switcher'),
		blockLocation =$('.b-location');

	var init = function(){
		_setupListeners();
	},

	_setupListeners = function(){
		if (switchers.length) {
			switchers.on('click touchstart', _changePattern);
		}
	},

	_changePattern =function(e){
		(e.preventDefault) ? e.preventDefault(): e.returnValue;
		wmarkPosition.reset();
		wmarkOpacity.reset();
		upload.reset();
        dragDrop.toggle();

		var el = $(this),
			intervals = $('.b-intervals');

		if (el.data('switch') === 'single') {
			if (intervals.length) {
				intervals.remove();
			}
		} else {
			if (!intervals.length) {
				blockLocation.prepend('<div class="b-intervals"><div class="b-interval m-hor" /><div class="b-interval m-vert" />');
			}
		}

		if (!(el.hasClass('m-active'))) {
			el.addClass('m-active');
			el.siblings('.m-active').removeClass('m-active');
		}

	};

	return {
		init: init
	}

})();