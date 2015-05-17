var imageWrap = (function(){

	var addImg = function(img) {
		var imgWrapper = $('.b-main-img-wr');
			imgWrapper.prepend(img);

		img.on('load', function(){
			$('.b-main-img-wr').css({'height':$(this).height() ,'width':$(this).width()});
		});
	};

	return {
		addImg: addImg
	}

})();