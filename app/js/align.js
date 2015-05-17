var wmarkAlign = (function(){

	var
		// обертка картинки
		imgWrap = $('.b-main-area'),

		// ее ширина и высота
		imgWrapHeight = imgWrap.height(),
		imgWrapWidth = imgWrap.width(),

		// размеры ватермарка
		wtmarkHeight = 0,
		wtmarkWidth = 0;


	var init = function () {

		var wtmark = $('#watermark');

		// если ватермарк есть то вычисляем его размеры
		if (wtmark.length) {
			wtmark.on('load', function(){
				wtmarkHeight = wtmark.height();
				wtmarkWidth = wtmark.width();

				var midPosX = (imgWrapWidth - wtmarkWidth) / 2,
					midPosY = (imgWrapHeight - wtmarkHeight) / 2;

				$('.b-grid-list li').each(function(i,el){
					$(el).on('click touchstart', function(){
						var li = $(this),
							posit = li.data('pos');

						li.siblings('.m-active').removeClass('m-active');
						li.addClass('m-active');
						wtmark.css('position','absolute');

						switch (posit) {
							case 'top-left':
								wtmark.css({'left':'0','top':'0','right':'auto','bottom':'auto'});
								break;
							case 'top-center':
								wtmark.css({'left':midPosX,'top':'0','right':'auto','bottom':'auto'});
								break;
							case 'top-right':
								wtmark.css({'left':'auto','top':'0','right':'0','bottom':'auto'});
								break;
							case 'mid-left':
								wtmark.css({'left':'0','top':midPosY,'right':'auto','bottom':'auto'});
								break;
							case 'mid-center':
								wtmark.css({'left':midPosX,'top':midPosY,'right':'auto','bottom':'auto'});
								break;
							case 'mid-right':
								wtmark.css({'left':'auto','top':midPosY,'right':'0','bottom':'auto'});
								break;
							case 'btm-left':
								wtmark.css({'left':'0','top':'auto','right':'auto','bottom':'0'});
								break;
							case 'btm-center':
								wtmark.css({'left':midPosX,'top':'auto','right':'auto','bottom':'0'});
								break;
							case 'btm-right':
								wtmark.css({'left':'auto','top':'auto','right':'0','bottom':'0'});
								break;
						}
					});
				});
			});
		}
	};

	return {
		init: init
	};

})();