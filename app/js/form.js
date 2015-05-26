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
			wmarkWrapper = $('.b-main-wtmark-wrapper');

		// set params for php
		xposMulti.val(wmarkWrapper.position().left);
		yposMulti.val(wmarkWrapper.position().top);
		patternWidth.val(wmarkWrapper.width());
		patterHeight.val(wmarkWrapper.height());

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
		$.ajax(obj).done(function(data) {
			// add src for download iframe
			$('#downloadFrame').attr('src' , "./php/download.php?file=" + data);
		});

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