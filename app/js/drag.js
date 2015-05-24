var dragDrop = (function(){
    var xpos = $('.b-controls input[name="xpos"]'),
        ypos = $('.b-controls input[name="ypos"]'),
        waterWrap = $('.b-main-wtmark-wrapper');

	var appendDraggableEl = function(url){
			var image = $('<img class="watermark" src="' + url + '">');

        if(waterWrap.children('.watermark')){
            waterWrap.children('.watermark').remove();
        }
            
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
        if(waterWrap.draggable('option', 'containment') == false) {
            waterWrap.draggable( "destroy" );
            waterWrap.draggable({
                containment: '#image',
                cursor: 'move',
                drag: function( event, ui ) {
                    xpos.val(Math.round(ui.position.left));
                    ypos.val(Math.round(ui.position.top));
                    wmarkPosition.clearGrid();
                }
            });
            _removeWatermark();
        } else {
            waterWrap.draggable( "destroy" );
            waterWrap.draggable({
                cursor: 'move'
            });
            _cloneWatermark();
        }
    },
    _cloneWatermark = function(){
        var clone = $('.watermark').clone().addClass('watermark_cloned'),
            imageWrap = $('.b-main-image-wrapper'),
            imageWidth = imageWrap.width(),
            imageHeight = imageWrap.height(),
            watermark = $('.watermark'),
            watermarkHeight = watermark.height(),
            watermarkWidth = watermark.width(),
            needClones = Math.ceil(imageHeight / watermarkHeight) * Math.ceil(imageWidth / watermarkWidth) * 4 - 1,
            tmp = [];

        for ( var i = 0; i < needClones; i++ ) {
            $.merge( tmp, clone.clone().get() );
        }

        waterWrap.css({
            'min-width': imageWidth * 2 + 'px',
            'min-height': imageHeight * 2 + 'px'
        });
        waterWrap.append(tmp);
    },
    _removeWatermark = function(){
        var watermark = $('.watermark');

        $('.watermark_cloned').remove();

        waterWrap.css({
            'min-width': watermark.width() + 'px',
            'min-height': watermark.height() + 'px'
        });
    };

	return {
		appendEl: appendDraggableEl,
        toggle: toggleContainment
	};

})();