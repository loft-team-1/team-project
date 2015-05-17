var dragDrop = (function(){

	var _appendDraggableEl = function(url){
		var xpos = $('.b-controls input[name="xpos"]'),
			ypos = $('.b-controls input[name="ypos"]'),
			workspace = $('#workspace'),
			image = $('<img id="watermark" src="' + url + '">');

		image.appendTo(workspace).draggable({
			containment: '#image',
			cursor: 'move',
			drag: function( event, ui ) {
				xpos.val(Math.round(ui.position.left));
				ypos.val(Math.round(ui.position.top));
			}
		});
	},

	_resetPosition = function(){
		var xpos = $('.b-controls input[name="xpos"]'),
			ypos = $('.b-controls input[name="ypos"]'),
			wtmark = $('#watermark');

		xpos.val(0);
		ypos.val(0);
		wtmark.css({
			'left': 0,
			'top': 0
		})
	};

	return {
		appendEl: _appendDraggableEl,
		reset: _resetPosition
	};

})();