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

		$('.m-for-multi .b-control-arrow').on('click touchstart', _arrowsChange);
	},

	_changePattern =function(e){
		(e.preventDefault) ? e.preventDefault(): e.returnValue;
		wmarkPosition.reset();
		wmarkOpacity.reset();
		upload.reset();

		var el = $(this),
			intervals = $('.b-intervals'),
			single = $('.m-for-single'),
			multi = $('.m-for-multi');

		if (el.data('switch') === 'single') {
			
			_resetIntervals();

			if (intervals.length) {
				intervals.remove();
			};

			if (!(single.hasClass('m-active'))) {
				single.addClass('m-active');
				single.siblings('.m-active').removeClass('m-active');
			};


		} else {
			if (!intervals.length) {
				blockLocation.prepend('<div class="b-intervals"><div class="b-interval m-hor" /><div class="b-interval m-vert" />');
			};
			if (!(multi.hasClass('m-active'))) {
				multi.addClass('m-active');
				multi.siblings('.m-active').removeClass('m-active');
			}

		}

		if (!(el.hasClass('m-active'))) {
			el.addClass('m-active');
			el.siblings('.m-active').removeClass('m-active');
		}

	},

	_resetIntervals = function() {
		$('.b-interval.m-hor').css('width', '1px');
		$('.b-interval.m-vert').css('height', '1px');
		$('.m-for-multi input').val('0');
	},

	_arrowsChange = function(e){
		e.preventDefault();

		var $this = $(this),
			input = $this.siblings('input[type="text"]'),
			curVal = parseInt(input.val()) || 0,
			max = 102,
			min = 0,
			changeVal = $this.hasClass('m-top') ? curVal + 1 : curVal - 1,
			axis = input.is('.b-controls input[name="xinterval"]') ? 'width' : 'height';

		if(changeVal > max){
			changeVal = max
		} else if(changeVal < min){
			changeVal = min
		}

		input.val(changeVal);
		if (axis === 'width') {
			$('.b-interval.m-hor').css(axis, changeVal + 'px');
		} else {
			$('.b-interval.m-vert').css(axis, changeVal + 'px');
		}
	};

	return {
		init: init,
		reset: _resetIntervals
	}

})();