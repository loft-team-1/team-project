var dragDrop = (function(){

	// set variables
	var xpos = $('.b-controls input[name="xpos"]'),
		ypos = $('.b-controls input[name="ypos"]'),
		imgWrap = $('.b-main-image-wrapper'),
		wmarkWrap = $('.b-main-wmark-wrapper');

	// append watermark to working area
	var appendDraggableEl = function(url){
		var appendEl = $('<img class="watermark" src="' + url + '">');

		_removeClonedWatermark();
		wmarkWrap.append(appendEl);

		appendEl.on('load', function(){
			_dragDestroy();
			_checkContainment();
		});
	},

	// check the drag mode
	_checkContainment = function () {
		var img = $('#image'),
			wmark = $('.watermark');

		wmarkWrap.css({'height': wmark.height() ,'width': wmark.width()});

		if(wmark.width() > img.width() && wmark.height() > img.height()) {
			_dragUnContainment('single');
		} else {
			_dragContainment();
		}
	},

	// if watermark less than the image - use containment settings
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

	// if watermark bigger than the image - use uncontainment settings
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

				// horizontal
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

	// toggle multi or single mode
	toggleMode = function(mode){
		_dragDestroy();

		if(mode === 'multi') {
			_dragUnContainment('multi');
			_cloneWatermark();
		} else {
			_checkContainment();
			_removeClonedWatermark();
		}
	},

	// cloning watermark for the multi mode
	_cloneWatermark = function(){
		var wmark = $('.watermark'),
			wmarkHeight = wmark.height(),
			wmarkWidth = wmark.width(),
			patternWidth = imgWrap.width(),
			patternHeight = imgWrap.height(),
			clone = wmark.clone().addClass('watermark_cloned'),
			needClonesHor = Math.ceil(patternWidth / wmarkWidth),
			needClonesVert = Math.ceil(patternHeight / wmarkHeight),
			needClones = needClonesHor * needClonesVert * 4 -1,
			tmp = [];

		for ( var i = 0; i < needClones; i++ ) {
			$.merge( tmp, clone.clone().get() );
		}

		wmarkWrap.css({
			'width': needClonesHor * wmarkWidth + wmarkWidth + 'px',
			'height': needClonesVert * wmarkHeight + wmarkHeight +'px'
		});
		wmarkWrap.append(tmp);
	},

	// remove cloned watermarks
	_removeClonedWatermark = function(){
		var clonedEl = $('.watermark_cloned');

		if(clonedEl.length) {
			clonedEl.remove();
		}
	},

	// drag destroy
	_dragDestroy = function(){
		if(wmarkWrap.data('uiDraggable')){
			wmarkWrap.draggable("destroy");
		}
	};

	return {
		appendEl: appendDraggableEl,
		toggle: toggleMode
	};

})();
