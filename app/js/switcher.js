var switchPattern  = (function(){
	
	var switchers = $('.b-switcher'),
		blockLocation =$('.b-location');


	var init = function(){

		_setupListeners();

	},

	_setupListeners = function(){
		if (switchers.length) {
			switchers.on('click touchstart', _changePattern);
		};

		 $('.b-control-arrow').on('click touchstart', _arrowsChange);
	},

	_changePattern =function(){
		var el = $(this);
		if (el.data('switch') === 'once') {
		 	if ($('.wtmark-interval-wrapper').length) {
				$('.wtmark-interval-wrapper').remove();
			};
		} else {
			blockLocation.prepend('<div class="wtmark-interval-wrapper"><div class="width-interval">&nbsp;</div><div class="height-interval">&nbsp;</div></div>');
		};

		if (!(el.hasClass('m-active'))) {
				el.addClass('m-active');
				el.siblings('.m-active').removeClass('m-active');
		};

	},

	_arrowsChange = function(e){
		e.preventDefault();

        var $this = $(this),
            input = $this.siblings('input[type="text"]'),
            curVal = parseInt(input.val()) || 0,
            max = 102,
            min = 0,
            changeVal = $this.hasClass('m-top') ? curVal + 1 : curVal - 1,
            axis = input.is('.b-controls input[name="xpos"]') ? 'width' : 'height';

        if(changeVal > max){
            changeVal = max
        } else if(changeVal < min){
            changeVal = min
        }

        input.val(changeVal);
        if (axis === 'width') {
        	$('.width-interval').css(axis, changeVal + 'px');
        } else {
        	$('.height-interval').css(axis, changeVal + 'px');
        }
	}

	return {
		init: init
	}
})();