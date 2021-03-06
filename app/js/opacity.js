var wmarkOpacity = (function(){

	// set variables
	var sliderEl = $('.b-opacity-slider'),
		wmarkWrap = $('.b-main-wmark-wrapper');

	var init = function(){
		// set variables
		var hiddenOpacity = $('input[name="opacity"]');

		// slider initialization
		if (sliderEl.length) {
			sliderEl.slider({
				min: 0,
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
		sliderEl.slider( "option", "disabled", false );
	},

	// slider reset
	sliderReset = function(){
		sliderEl.slider('value', 100);
		wmarkWrap.css('opacity', 100);
	};

	return {
		init: init,
		enable: sliderEnable,
		reset: sliderReset
	};

})();
