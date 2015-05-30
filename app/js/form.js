var form = (function(){

	var init = function () {
		_setUpListeners();
	},

	// set listeners
	_setUpListeners = function () {
		var $form = $('form');
		$form.on('submit', _formSubmit);
		$form.on('reset', _formReset);
	},

	// form submit
	_formSubmit = function (e) {
		e.preventDefault ? e.preventDefault() : e.returnValue;

		// set variables
		var $form = $(this),
			formAction = $form.attr('action'),
			formdata = false,
			xposMulti = $('input[name="xposMulti"]'),
			yposMulti = $('input[name="yposMulti"]'),
			patternWidth = $('input[name="patternWidth"]'),
			patterHeight = $('input[name="patternHeight"]'),
			wmarkWrap = $('.b-main-wmark-wrapper');

		// set params for php
		xposMulti.val(wmarkWrap.position().left);
		yposMulti.val(wmarkWrap.position().top);
		patternWidth.val(wmarkWrap.width());
		patterHeight.val(wmarkWrap.height());

		// show Loader
		_showLoader();

		// set params for ajax
		var obj = {
			type: "POST",
			url: formAction,
			data: formdata ? formdata : $form.serialize()
		};

		if (window.FormData){
			obj.data = new FormData(this);
			obj.processData = false;
			obj.contentType = false;
		}

		// get response from php
		$.ajax(obj)
			.done(function(data) {
				// add src for download iframe
				$('#downloadFrame').attr('src' , "./php/download.php?file=" + data);
			}).fail(function() {

				var lang = localStorage.getItem('lang') || 'ru';

				if (lang ==='ru') {
					alert('У нас не хватает мощности для обработки ваших изображений. Пожалуйста, попробуйте использовать другой водяной знак.');
				} else {
					alert("We didn't have enough power to handle your images. Please, try use another watermark.");
				}
			}).always(function(){
				_hideLoader();
			});
	},

	// show Loader
	_showLoader = function(){
		$('body').append('<div class="b-overlay"><div class="b-spinner"><div class="b-bounce1"></div><div class="b-bounce2"></div><div class="b-bounce3"></div></div></div>');
	},

	// hide Loader
	_hideLoader = function(){
		$('.b-overlay').remove();
	},

	// form reset
	_formReset = function (e){
		(e.preventDefault) ? e.preventDefault(): e.returnValue;
		wmarkPosition.reset();
		wmarkOpacity.reset();
		upload.reset();
	};

	return {
		init: init
	};

})();
