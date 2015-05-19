var wmarkOpacity = (function(){

	var init = function(){
		var sliderEl = $('.b-opacity-slider'),
			wtmark = $('.b-main-wtmark-wrapper img');

		if (sliderEl.length) {
			sliderEl.slider({
				min: 1,
				max: 100,
				value: 100,
				range: 'min',
                disabled: true,
				slide: function(event, ui) {
					wtmark.css('opacity', ui.value / 100);
				}
			});
		}
	},

    sliderEnable = function(){
        var sliderEl = $('.b-opacity-slider');
        sliderEl.slider( "option", "disabled", false );
    },

	resetOpacity = function(){
		var sliderEl = $('.b-opacity-slider'),
			wtmark = $('.b-main-wtmark-wrapper img');

		sliderEl.slider('value', 100);
		wtmark.css('opacity', 100);
	};

	return {
		init: init,
        enable: sliderEnable,
		reset: resetOpacity
	};

})();