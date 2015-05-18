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
                    wmarkPosition.clearGrid();
				}
			});
		});
	};

	return {
		appendEl: appendDraggableEl
	};

})();