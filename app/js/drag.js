var dragDrop = (function(){

	var xpos = $('.b-controls input[name="xpos"]'),
		ypos = $('.b-controls input[name="ypos"]'),
		wmarkWrap = $('.b-main-wtmark-wrapper'),
		wmark = $('.watermark'),
		image = $('#image');

	var appendDraggableEl = function(url){
		var appendEl = $('<img class="watermark" src="' + url + '">');

		_removeClonedWatermark();

		wmarkWrap.append(appendEl);

		appendEl.on('load', function(){

			wmarkWrap.css({'height':$(this).height() ,'width':$(this).width()});

			if(wmarkWrap.data('uiDraggable')){
				wmarkWrap.draggable("destroy");
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
		wmarkWrap.draggable({
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

		wmarkWrap.draggable({
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

		if(wmarkWrap.data('uiDraggable')){
			wmarkWrap.draggable("destroy");
		}

		if(mode === 'multi') {
			_dragUnContainment('multi');
			_cloneWatermark();
		} else {
			_checkContainment();
			_removeClonedWatermark();
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

		wmarkWrap.css({
			'width': needClonesHor * watermarkWidth + watermarkWidth + 'px',
			'height': needClonesVert * watermarkHeight + watermarkHeight +'px'
		});
		wmarkWrap.append(tmp);
	},

	_removeClonedWatermark = function(){
		if($('.watermark_cloned').length) {
			$('.watermark_cloned').remove();
		}
	};

	return {
		appendEl: appendDraggableEl,
		toggle: toggleMode
	};

})();