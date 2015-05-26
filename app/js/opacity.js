var wmarkOpacity = (function(){

	var init = function(){
		// set variables
		var sliderEl = $('.b-opacity-slider'),
			wmarkWrap = $('.b-main-wmark-wrapper'),
			hiddenOpacity = $('input[name="opacity"]');

		// slider initialization
		if (sliderEl.length) {
			sliderEl.slider({
				min: 1,
				max: 100,
				value: 100,
				range: 'min',
				disabled: true,
				slide: function(event, ui) {
					wmarkWrap.css('opacity', ui.value / 100);
					hiddenOpacity.val(ui.value);
				}
			});
		}
	},

	// slider enable
	sliderEnable = function(){
		var sliderEl = $('.b-opacity-slider');
		sliderEl.slider( "option", "disabled", false );
	},

	// slider reset
	sliderReset = function(){
		var sliderEl = $('.b-opacity-slider'),
			wmarkWrap = $('.b-main-wmark-wrapper');

		sliderEl.slider('value', 100);
		wmarkWrap.css('opacity', 100);
	};

	return {
		init: init,
		enable: sliderEnable,
		reset: sliderReset
	};

})();