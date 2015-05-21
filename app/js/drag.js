var dragDrop = (function(){

	var init = function(){

		},
		
		appendDraggableEl = function(url){
			var xpos = $('.m-for-single input[name="xpos"]'),
				ypos = $('.m-for-single input[name="ypos"]'),
				waterWrap = $('.b-main-wtmark-wrapper'),
				image = $('<img id="watermark" src="' + url + '">');

	        waterWrap.append(image);

			image.on('load', function(){
	            waterWrap.css({'height':$(this).height() ,'width':$(this).width()});
	            waterWrap.draggable({
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