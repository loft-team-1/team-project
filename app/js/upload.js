var upload = (function(){

	// set fileUpload options
	var init = function(){
		var options = {
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize: 150000,
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			disableImageResize: /Android(?!.*Chrome)|Opera/
				.test(window.navigator && navigator.userAgent)
		},

		fileUpload = $('input[type="file"]').fileupload(options);
		_setUpFileUploadListeners(fileUpload);
	},

	// set listeners
	_setUpFileUploadListeners = function (fileUpload) {
		fileUpload.on('fileuploadadd', _fileUploadAdd);
		fileUpload.on('fileuploaddone', _fileUploadDone);
		fileUpload.on('fileuploadprocessalways', _fileUploadAlways);
		fileUpload.on('fileuploadchange', _fileUploadChange);
	},

	// add options only for basic image
	_fileUploadAdd = function () {
		if($(this).is('#fileupload')) {
			var fileupload = $(this).data('blueimpFileupload');
			fileupload.options.imageMaxWidth = 650;
			fileupload.options.imageMaxHeight = 534;
			fileupload.options.maxFileSize = 1000000;
		}
	},

	// upload images in work area
	_fileUploadDone = function (e, data) {
		var $this = $(this),
			type = $this.is('#fileupload') ? 'image' : 'watermark',
			imgName = data.result.files[0].name,
			src = 'php/files/' + imgName,
			img = $('<img id="'+ type +'" src="' + src + '">'),
			wmark = $('.watermark'),
			wmarkFile = $('#wmarkfile');

			$this.siblings().children('input').val(imgName);

		switchPattern.change($('.b-switcher.m-single'));
		wmarkOpacity.init();

		if(type == 'image'){
			var imgWrap = $('.b-main-image-wrapper');

			if(wmark.length) {
				wmark
					.parent().removeAttr('style')
					.end().remove();
				wmarkFile
					.parent('.b-custom-upload')
					.find('.b-input').val('');
				_disableSections();
			}

			imgWrap.prepend(img);
			img.on('load', function(){
				$('.b-main-image-wrapper').css({'height':$(this).height() ,'width':$(this).width()});
			});

		} else {
			dragDrop.appendEl(src);
			wmarkOpacity.enable();
			wmarkPosition.init();
			$('.m-disabled-area').css('display','none');
			$('.b-section').removeClass('m-disabled');
			$('.m-btns input').prop('disabled', false);
		}

		wmarkFile.prop('disabled', false);
		$('.b-custom-upload').removeClass('m-disabled');
	},

	// show errors
	_fileUploadAlways = function (e, data) {
		var index = data.index,
			file = data.files[index],
			lang = $('.b-language-link.m-active'),
			errorMsg = file.error;

		if(lang.attr('id') === 'ru'){
			if(file.error === 'File is too large') {
				errorMsg = 'Файл слишком большой'
			} else {
				errorMsg = 'Недопустимый тип файла'
			}
		}

		if (file.error) {
			$(this).tooltip({ content: errorMsg });
			$(this).siblings().children('input').val('');
			_disableSections();
		}
	},

	// remove errors and images
	_fileUploadChange = function () {
		var file = $(this).is('#fileupload') ? 'image' : 'watermark',
			fileSelector = $('#'+ file),
			type = $(this).attr('id');

		if(file == 'watermark'){
			fileSelector = $('.'+ file);
		}

		fileSelector
			.parent().removeAttr('style')
			.end().remove();
		$('.b-tooltip[data-name="' + type + '"]').remove();
	},

	// disable sections if watermark not loaded
	_disableSections = function(){
		wmarkPosition.reset();
		wmarkOpacity.reset();
		wmarkPosition.disable();

		$('.m-disabled-area').css('display','block');
		$('.b-section:not(:first-child)').addClass('m-disabled');
		$('.m-btns input').prop('disabled', true);
	},

	// remove tooltip
	resetError = function(){
		$('.b-tooltip').remove();
	};

	return {
		init: init,
		reset: resetError
	}

})();
