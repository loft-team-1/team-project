var dragDrop = (function(){

	var xpos = $('.b-controls input[name="xpos"]'),
		ypos = $('.b-controls input[name="ypos"]'),
		waterWrap = $('.b-main-wtmark-wrapper'),
		wmark = $('.watermark'),
		image = $('#image');

	var appendDraggableEl = function(url){
		var appendEl = $('<img class="watermark" src="' + url + '">');

		waterWrap.append(appendEl);

		appendEl.on('load', function(){

			waterWrap.css({'height':$(this).height() ,'width':$(this).width()});

			if(waterWrap.data('uiDraggable')){
				waterWrap.draggable("destroy");
			}

			_checkContainment();
		});
	},

	_checkContainment = function () {
		if(wmark.width() > image.width() && wmark.height() > image.height()) {
			_dragUnContainment('single');
		} else {
			_dragContainment();
		}
	},

	_dragContainment = function () {
		waterWrap.draggable({
			containment: '#image',
			cursor: 'move',
			drag: function(ev, ui){
				xpos.val(Math.round(ui.position.left));
				ypos.val(Math.round(ui.position.top));
				wmarkPosition.clearGrid();
			}
		});
	},

	_dragUnContainment = function (mode) {

		waterWrap.draggable({
			drag: function(ev, ui){
				if(mode === 'single') {
					xpos.val(Math.round(ui.position.left));
					ypos.val(Math.round(ui.position.top));
					wmarkPosition.clearGrid();
				}
			},
			stop: function(ev, ui) {
				var hel = ui.helper,
					pos = ui.position;

				//horizontal
				var h = -(hel.outerHeight() - $(hel).parent().outerHeight());
				if (pos.top >= 0) {
					hel.animate({ top: 0 });
					if(mode === 'single') {
						ypos.val(0);
					}
				} else if (pos.top <= h) {
					hel.animate({ top: h });
					if(mode === 'single') {
						ypos.val(h);
					}
				}

				// vertical
				var v = -(hel.outerWidth() - $(hel).parent().outerWidth());

				if (pos.left >= 0) {
					hel.animate({ left: 0 });
					if(mode === 'single') {
						xpos.val(0);
					}

				} else if (pos.left <= v) {
					hel.animate({ left: v });
					if(mode === 'single') {
						xpos.val(v);
					}
				}
			}
		});
	},

	toggleMode = function(mode){

		if(waterWrap.data('uiDraggable')){
			waterWrap.draggable("destroy");
		}

		if(mode === 'multi') {
			_dragUnContainment('multi');
			_cloneWatermark();
		} else {
			_checkContainment();
		}
	},

	_cloneWatermark = function(){
		var watermark = $('.watermark'),
			watermarkHeight = watermark.height(),
			watermarkWidth = watermark.width(),
			imageWrap = $('.b-main-image-wrapper'),
			patternWidth = imageWrap.width(),
			patternHeight = imageWrap.height(),
			clone = watermark.clone().addClass('watermark_cloned'),
			needClonesHor = Math.ceil(patternWidth / watermarkWidth),
			needClonesVert = Math.ceil(patternHeight / watermarkHeight),
			needClones = needClonesHor * needClonesVert * 4 -1,
			tmp = [];

		for ( var i = 0; i < needClones; i++ ) {
			$.merge( tmp, clone.clone().get() );
		}

		waterWrap.css({
			'width': needClonesHor * watermarkWidth + watermarkWidth + 'px',
			'height': needClonesVert * watermarkHeight + watermarkHeight +'px'
		});
		waterWrap.append(tmp);
	};

	return {
		appendEl: appendDraggableEl,
		toggle: toggleMode
	};

})();