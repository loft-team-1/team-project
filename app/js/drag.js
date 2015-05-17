var dragDrop = (function(){

	var appendDraggableEl = function(url){
		var xpos = $('.b-controls input[name="xpos"]'),
			ypos = $('.b-controls input[name="ypos"]'),
			wtmwr = $('#workspace .b-main-wtm-wr'),
			image = $('<img id="watermark" src="' + url + '">');

		wtmwr.append(image);

		image.on('load', function(){
			$('.b-main-wtm-wr').css({'height':$(this).height() ,'width':$(this).width()});
			$('.b-main-wtm-wr').draggable({
				containment: '#image',
				cursor: 'move',
				drag: function( event, ui ) {
					xpos.val(Math.round(ui.position.left));
					ypos.val(Math.round(ui.position.top));
				}
			});
		});
	},

	resetPosition = function(){
		var xpos = $('.b-controls input[name="xpos"]'),
			ypos = $('.b-controls input[name="ypos"]'),
			wtmark = $('.b-main-wtm-wr');

		xpos.val(0);
		ypos.val(0);
		wtmark.css({
			'left': 0,
			'top': 0
		})
	};

	return {
		appendEl: appendDraggableEl,
		reset: resetPosition
	};

})();