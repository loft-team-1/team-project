var wmarkOpacity = (function(){

	var init = function(){
		var sliderEl = $('.b-opacity-slider'),
			wtmark = $('.b-main-wtm-wr img');

		if (sliderEl.length) {
			sliderEl.slider({
				min: 1,
				max: 100,
				value: 100,
				range: 'min',
				slide: function(event, ui) {
					wtmark.css('opacity', ui.value / 100);
				}
			});
		}
	},

	_resetOpacity = function(){
		var sliderEl = $('.b-opacity-slider'),
			wtmark = $('.b-main-wtm-wr img');

		sliderEl.slider('value', 100);
		wtmark.css('opacity', 100);
	};

	return {
		init: init,
		reset: _resetOpacity
	};

})();