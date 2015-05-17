var upload = (function(){

	var init = function(){
		$('input[type="file"]').fileupload({
			dataType: 'json',
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			disableImageResize: /Android(?!.*Chrome)|Opera/
				.test(window.navigator && navigator.userAgent),
			done: function (e, data) {
				var type = $(this).is('#fileupload') ? 'image' : 'watermark',
					imageName = data.result.files[0].name,
					src = 'php/files/' + imageName,
					image = $('<img id="'+ type +'" src="' + src + '" class="b-main-area-' + type + '">');

				// remove images
				$('#'+type).remove();

				if(type == 'image'){
					$('#workspace').append(image);
				} else {
					dragDrop.appendEl(src);
					wmarkOpacity.init();
					wmarkAlign.init();
				}

			}
		})
		.on('fileuploadadd', function (e, data) {
			// add options only for basic image
			if($(this).is('#fileupload')) {
				var fileupload = $(this).data('blueimpFileupload');
				fileupload.options.imageMaxWidth = 650;
				fileupload.options.imageMaxHeight = 534;
			}
		})
	};

	return {
		init: init
	}

})();