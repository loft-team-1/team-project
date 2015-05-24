var dragDrop = (function(){

	var appendDraggableEl = function(url){

		var xpos = $('.b-controls input[name="xpos"]'),
			ypos = $('.b-controls input[name="ypos"]'),
			waterWrap = $('.b-main-wtmark-wrapper'),
			image = $('<img id="watermark" src="' + url + '">');

		waterWrap.append(image);

		image.on('load', function(){

			waterWrap.css({'height':$(this).height() ,'width':$(this).width()});

			if(waterWrap.data('uiDraggable')){
				waterWrap.draggable("destroy");
			}

			if(image.width() > $('#image').width() && image.height() > $('#image').height()) {

				waterWrap.draggable({
					drag: function( event, ui ) {
						xpos.val(Math.round(ui.position.left));
						ypos.val(Math.round(ui.position.top));
						wmarkPosition.clearGrid();
					},
					stop: function(ev, ui) {
						var hel = ui.helper, pos = ui.position;
						//horizontal
						var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
						if (pos.top >= 0) {
							hel.animate({ top: 0 });
						} else if (pos.top <= h) {
							hel.animate({ top: h });
						}
						// vertical
						var v = -(hel.outerWidth() - $(hel).parent().outerWidth());
						if (pos.left >= 0) {
							hel.animate({ left: 0 });
						} else if (pos.left <= v) {
							hel.animate({ left: v });
						}
					}
				});
			}
			else {
				waterWrap.draggable({
					containment: '#image',
					cursor: 'move',
					drag: function( event, ui ) {
						xpos.val(Math.round(ui.position.left));
						ypos.val(Math.round(ui.position.top));
						wmarkPosition.clearGrid();
					}
				});
			}
		});
	};

	return {
		appendEl: appendDraggableEl
	};

})();