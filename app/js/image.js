var imageWrap = (function(){
	var _appendImg = function(img) {
		var imgwr = $('.b-main-img-wr');
			imgwr.append(img);
			img.on('load', function(){
				$('.b-main-img-wr').css({'height':$(this).height() ,'width':$(this).width()});
			});

	};
	return {
		appendimg : _appendImg
	}
})();
