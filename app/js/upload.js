var upload = (function(){
	var init = function(){
		var options = {
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			disableImageResize: /Android(?!.*Chrome)|Opera/
				.test(window.navigator && navigator.userAgent)
		},

		fileUpload = $('input[type="file"]').fileupload(options);
		_setUpFileUploadListeners(fileUpload);
	},

	_setUpFileUploadListeners = function (fileUpload) {
		fileUpload.on('fileuploadadd', _fileUploadAdd);
		fileUpload.on('fileuploaddone', _fileUploadDone);
		fileUpload.on('fileuploadprocessalways', _fileUploadAlways);
		fileUpload.on('fileuploadchange', _fileUploadChange);
	},

	// add options only for basic image
	_fileUploadAdd = function (e, data) {
		if($(this).is('#fileupload')) {
			var fileupload = $(this).data('blueimpFileupload');
			fileupload.options.imageMaxWidth = 650;
			fileupload.options.imageMaxHeight = 534;
		}
	},

	// upload images in work area
	_fileUploadDone = function (e, data) {
		var $this = $(this),
			type = $this.is('#fileupload') ? 'image' : 'watermark',
			imageName = data.result.files[0].name,
			src = 'php/files/' + imageName,
			image = $('<img id="'+ type +'" src="' + src + '">'),
			watermark = $('#watermark');

			$this.siblings().children('input').val(imageName);

		if(type == 'image'){
			var imgWrapper = $('.b-main-image-wrapper');

			if(watermark.length) {
				watermark
					.parent().removeAttr('style')
					.end().remove();
				$('#wmarkfile')
					.parent('.b-custom-upload')
					.find('.b-input').val('');
				_disableSections();
			}

			imgWrapper.prepend(image);
			image.on('load', function(){
				$('.b-main-image-wrapper').css({'height':$(this).height() ,'width':$(this).width()});
			});
		} else {
			wmarkPosition.reset();
			dragDrop.appendEl(src);
			wmarkOpacity.init();
			wmarkOpacity.enable();
			wmarkPosition.init();
			$('.m-disabled-area').css('display','none');
			$('.b-section').removeClass('m-disabled');
			$('.m-btns input').prop('disabled', false);
		}
		$('#wmarkfile').prop('disabled', false);
		$('.b-custom-upload').removeClass('m-disabled');
	},

	// show errors
	_fileUploadAlways = function (e, data) {
		var index = data.index,
			file = data.files[index];

		if (file.error) {
			$(this).tooltip({
				content: 'Недопустимый тип файла.'
			});
			_disableSections();
		}
	},

	// remove errors and images
	_fileUploadChange = function (e, data) {
		var file = $(this).is('#fileupload') ? 'image' : 'watermark',
			type = $(this).attr('id');

		$('#'+ file)
			.parent().removeAttr('style')
			.end().remove();
		$('.b-main-wtmark-wrapper').css({'left':'0', 'top': '0'});
		$('.b-tooltip[data-name="' + type + '"]').remove();
	},

	// disable sections if watermark not loaded
	_disableSections = function(){
		wmarkPosition.reset();
		wmarkOpacity.reset();
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
