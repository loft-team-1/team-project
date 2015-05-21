var dragDrop = (function(){

	var appendDraggableEl = function(url){
		var xpos = $('.b-controls input[name="xpos"]'),
			ypos = $('.b-controls input[name="ypos"]'),
			waterWrap = $('.b-main-wtmark-wrapper'),
			image = $('<img id="watermark" class="watermark" src="' + url + '">');

        waterWrap.append(image);

		image.on('load', function(){
            waterWrap.css({'min-height':$(this).height() ,'min-width':$(this).width()});
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
    },

    toggleContainment = function(){
        var waterWrap = $('.b-main-wtmark-wrapper');

        if(waterWrap.draggable('option', 'containment') == false) {
            waterWrap.draggable('option', 'containment', '#image');
            _removeWatermark();
        } else {
            waterWrap.draggable('option', 'containment', false);

            _cloneWatermark();
        }
    },
    _cloneWatermark = function(){
        var clone = $('.watermark').clone().addClass('watermark_cloned'),
            imageWrap = $('.b-main-image-wrapper'),
            imageWidth = imageWrap.width(),
            imageHeight = imageWrap.height(),
            watermark = $('.watermark'),
            watermarkWrap = $('.b-main-wtmark-wrapper'),
            watermarkHeight = watermark.height(),
            watermarkWidth = watermark.width(),
            needClones = Math.ceil(imageHeight / watermarkHeight) * Math.ceil(imageWidth / watermarkWidth) * 4 - 1,
            tmp = [];

        for ( var i = 0; i < needClones; i++ ) {
            $.merge( tmp, clone.clone().get() );
        }

        watermarkWrap.css({
            'min-width': imageWidth * 2 + 'px',
            'min-height': imageHeight * 2 + 'px'
        });
        watermarkWrap.append(tmp);
    },
    _removeWatermark = function(){
        var watermarkWrap = $('.b-main-wtmark-wrapper'),
            watermark = $('.watermark');

        $('.watermark_cloned').remove();

        watermarkWrap.css({
            'min-width': watermark.width() + 'px',
            'min-height': watermark.height() + 'px'
        });
    };

	return {
		appendEl: appendDraggableEl,
        toggle: toggleContainment
	};

})();