var switchPattern  = (function(){

	var switchers = $('.b-switcher'),
		blockLocation =$('.b-location');

	var init = function(){
		_setupListeners();
	},

	_setupListeners = function(){
		if (switchers.length) {
			switchers.on('click touchstart', function(e) {
                (e.preventDefault) ? e.preventDefault(): e.returnValue;
                changePattern($(this));
            });
		}
	},

	changePattern = function(elem){


		wmarkPosition.reset();
		wmarkOpacity.reset();
		upload.reset();

		var el = elem || $(this),
			intervals = $('.b-intervals');

		if (el.data('switch') === 'single') {
			if (intervals.length) {
				intervals.remove();
                dragDrop.toggle();
			};
			$('.m-hidden-switch').val('single');
		} else {
			if (!intervals.length) {
				blockLocation.prepend('<div class="b-intervals"><div class="b-interval m-hor" /><div class="b-interval m-vert" />');
                dragDrop.toggle();
			};
			$('.m-hidden-switch').val('multi');
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