var wmarkPosition = (function(){

	// set variables
	var min = 0,
		imgWrap = $('.b-main-image-wrapper'),
		wmarkWrap = $('.b-main-wmark-wrapper'),
		xpos = $('.b-controls input[name="xpos"]'),
		ypos = $('.b-controls input[name="ypos"]');


	var init = function(){
		_setUpListeners();
	},

	// set listeners
	_setUpListeners = function(){
		$('.b-controls input[type="text"]').on('input', _inputChange).prop('disabled', false);
		$('.b-controls .b-control-arrow').on('click touchstart', _arrowsChange);
		$('.b-grid-list li').on('click touchstart', _gridChange);
	},

	// set the position of the watermark with the grid
	_gridChange = function(){
		var minPosX = 0,
			minPosY = 0,
			midPosX = (imgWrap.width() - wmarkWrap.width()) / 2,
			midPosY = (imgWrap.height() - wmarkWrap.height()) / 2,
			maxPosX = imgWrap.width() - wmarkWrap.width(),
			maxPosY = imgWrap.height() - wmarkWrap.height(),
			li = $(this),
			position = li.data('pos');

		clearGrid();
		li.addClass('m-active');

		switch (position) {
			case 'top-left':
				wmarkWrap.css({'left':minPosX,'top':minPosY});
				_setPosition(minPosX,minPosY);
				break;
			case 'top-center':
				wmarkWrap.css({'left':midPosX,'top':minPosY});
				_setPosition(midPosX,minPosY);
				break;
			case 'top-right':
				wmarkWrap.css({'left':maxPosX,'top':minPosY});
				_setPosition(maxPosX,minPosY);
				break;
			case 'mid-left':
				wmarkWrap.css({'left':minPosX,'top':midPosY});
				_setPosition(minPosX,midPosY);
				break;
			case 'mid-center':
				wmarkWrap.css({'left':midPosX,'top':midPosY});
				_setPosition(midPosX,midPosY);
				break;
			case 'mid-right':
				wmarkWrap.css({'left':maxPosX,'top':midPosY});
				_setPosition(maxPosX,midPosY);
				break;
			case 'btm-left':
				wmarkWrap.css({'left':minPosX,'top':maxPosY});
				_setPosition(minPosX,maxPosY);
				break;
			case 'btm-center':
				wmarkWrap.css({'left':midPosX,'top':maxPosY});
				_setPosition(midPosX,maxPosY);
				break;
			case 'btm-right':
				wmarkWrap.css({'left':maxPosX,'top':maxPosY});
				_setPosition(maxPosX,maxPosY);
				break;
		}
	},

	// set the position of the watermark with the inputs
	_inputChange = function(){
		var $this = $(this),
			wmark = $('.watermark'),
			maxPosition = $this.is(xpos) ? imgWrap.width() - wmarkWrap.width() : imgWrap.height() - wmarkWrap.height(),
			maxMargin = $this.is(xpos) ? imgWrap.width() : imgWrap.height(),
			multi = $('.m-multi'),
			max = multi.hasClass('m-active') ? maxMargin : maxPosition,
			axis = $this.is(xpos) ? 'left' : 'top',
			wh = $this.is(ypos) ? 'height' : 'width',
			hv = $this.is(ypos) ? '.m-vert' : '.m-hor',
			margin = $this.is(xpos) ? 'margin-right' : 'margin-bottom',
			clones = $this.is(ypos) ? Math.ceil(imgWrap.height() / wmark.height()) + 1 : Math.ceil(imgWrap.width() / wmark.width()) +1 ;

		if($this.val() > max){
			$this.val(max);
		} else if($this.val() < min){
			$this.val(min);
		}

		if(multi.hasClass('m-active')){
			wmark.css(margin, $this.val() + 'px');
			wmarkWrap.css(wh, (wmark.width() * clones) + parseInt($this.val()) * clones + 'px');
			if ($this.val() > 0) {
				$('.b-interval' + hv).css(wh, Math.ceil($this.val()/2) + 'px');
			} else if ($this.val() == 0) {
				$('.b-interval' + hv).css(wh, '1px');
			}
		} else {
			wmarkWrap.css(axis, $this.val() + 'px');
		}

		clearGrid();
	},

	// set the position of the watermark with the arrows
	_arrowsChange = function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue;

		var $this = $(this),
			input = $this.siblings('input[type="text"]'),
			multi = $('.m-multi'),
			wmark = $('.watermark'),
			curVal = parseInt(input.val()) || 0,
			changeVal = $this.hasClass('m-top') ? curVal + 1 : curVal - 1,
			maxPosition = input.is(xpos) ? imgWrap.width() - wmarkWrap.width() : imgWrap.height() - wmarkWrap.height(),
			maxMargin = input.is(xpos) ? imgWrap.width() : imgWrap.height(),
			max = multi.hasClass('m-active') ? maxMargin : maxPosition,
			axis = input.is(xpos) ? 'left' : 'top',
			wh = input.is(ypos) ? 'width' : 'height',
			hv = input.is(ypos) ? '.m-hor' : '.m-vert',
			margin = input.is(xpos) ? 'margin-bottom' : 'margin-right',
			clones = input.is(ypos) ? Math.ceil(imgWrap.height() / wmark.height()) + 1: Math.ceil(imgWrap.width() / wmark.width())+1;

		if(changeVal > max || changeVal < min){
			changeVal = (changeVal > max) ? max : min;
			$this.addClass('m-disabled');
		} else if($this.siblings().hasClass('m-disabled')){
			$this.siblings().removeClass('m-disabled');
		}

		if(multi.hasClass('m-active')){
			wmark.css(margin, changeVal + 'px');
			wmarkWrap.css(wh, (wmark.width() * clones) + changeVal * clones + 'px');
			if (changeVal > 0) {
				$('.b-interval' + hv).css(wh, Math.ceil(changeVal/2) + 'px');
			}
		} else {
			wmarkWrap.css(axis, changeVal + 'px');
		}

		input.val(changeVal);
		clearGrid();
	},

	// set watermark position
	_setPosition = function(x,y){
		xpos.val(Math.round(x));
		ypos.val(Math.round(y));
	},

	// disable form events: buttons, arrows, grid, inputs TODO for-single
	disableEvents = function(){
		var elems = $('.b-controls input[type="text"], .b-control-arrow, .b-grid-list li');

		$('.b-controls input[type="text"]').off('input', _inputChange);
		$('.b-controls .b-control-arrow').off('click touchstart', _arrowsChange);
		$('.b-grid-list li').off('click touchstart', _gridChange);

		elems.on('click touchstart input', function(e){
			e.preventDefault ? e.preventDefault() : e.returnValue;
		});

		elems.filter('input').prop('disabled', true);
	},

	// remove grid marker
	clearGrid = function(){
		var gridItems = $('.b-grid-list li');

		if(gridItems.hasClass('m-active')){
			gridItems.removeClass('m-active');
		}
	},

	// reset watermark position
	resetPosition = function(){
		_setPosition(0,0);

		wmarkWrap.css({
			'left': 0,
			'top': 0
		});

		$('.watermark').removeAttr('style');

		clearGrid();

		$('.b-interval.m-hor').css('width', '1px');
		$('.b-interval.m-vert').css('height', '1px');
	};

	return {
		init: init,
		reset: resetPosition,
		clearGrid: clearGrid,
		disable: disableEvents
	};

})();