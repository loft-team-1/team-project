var form = (function(){

	var init = function () {
		_setUpListeners();
	},

	_setUpListeners = function () {
		var $form = $('form');
		$form.on('submit', _formSubmit);
		$form.on('reset', _formReset);
	},

	_formSubmit = function (e) {
		e.preventDefault ? e.preventDefault() : e.returnValue;

		var $form = $(this),
			formAction = $form.attr('action'),
			formdata = false,
			xposMulti = $('input[name="xposMulti"]'),
			yposMulti = $('input[name="yposMulti"]'),
			patternWidth = $('input[name="patternWidth"]'),
			patterHeight = $('input[name="patternHeight"]'),
			wmarkWrapper = $('.b-main-wtmark-wrapper');

		// Setting params for php
		xposMulti.val(wmarkWrapper.position().left);
		yposMulti.val(wmarkWrapper.position().top);
		patternWidth.val(wmarkWrapper.width());
		patterHeight.val(wmarkWrapper.height());

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

		$.ajax(obj).done(function(data) {
			$('#downloadFrame').attr('src' , "./php/download.php?file=" + data);
		});

	},

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