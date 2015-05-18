var wmarkPosition = (function(){

    //переменные
    var min = 0,
        imgWrap = $('.b-main-img-wr'),
        wmarkWrap = $('.b-main-wtm-wr'),
        xpos = $('.b-controls input[name="xpos"]'),
        ypos = $('.b-controls input[name="ypos"]');

	var init = function(){

            _setUpListeners();

        },

        _setUpListeners = function(){
            $('.b-controls input[type="text"]').on('input', _inputChange);
            $('.b-control-arrow').on('click touchstart', _arrowsChange);
            $('.b-grid-list li').on('click touchstart', _gridChange);
        },

        _gridChange = function(){

                    var minPosX = 0,
                        minPosY = 0,
                        midPosX = (imgWrap.width() - wmarkWrap.width()) / 2,
                        midPosY = (imgWrap.height() - wmarkWrap.height()) / 2,
                        maxPosX = imgWrap.width() - wmarkWrap.width(),
                        maxPosY = imgWrap.height() - wmarkWrap.height(),
                        li = $(this),
                        position = li.data('pos');

                    clearGrid();
                    li.addClass('m-active');

                    switch (position) {
                        case 'top-left':
                            wmarkWrap.css({'left':minPosX,'top':minPosY});
                            _setPosition(minPosX,minPosY);
                            break;
                        case 'top-center':
                            wmarkWrap.css({'left':midPosX,'top':minPosY});
                            _setPosition(midPosX,minPosY);
                            break;
                        case 'top-right':
                            wmarkWrap.css({'left':maxPosX,'top':minPosY});
                            _setPosition(maxPosX,minPosY);
                            break;
                        case 'mid-left':
                            wmarkWrap.css({'left':minPosX,'top':midPosY});
                            _setPosition(minPosX,midPosY);
                            break;
                        case 'mid-center':
                            wmarkWrap.css({'left':midPosX,'top':midPosY});
                            _setPosition(midPosX,midPosY);
                            break;
                        case 'mid-right':
                            wmarkWrap.css({'left':maxPosX,'top':midPosY});
                            _setPosition(maxPosX,midPosY);
                            break;
                        case 'btm-left':
                            wmarkWrap.css({'left':minPosX,'top':maxPosY});
                            _setPosition(minPosX,maxPosY);
                            break;
                        case 'btm-center':
                            wmarkWrap.css({'left':midPosX,'top':maxPosY});
                            _setPosition(midPosX,maxPosY);
                            break;
                        case 'btm-right':
                            wmarkWrap.css({'left':maxPosX,'top':maxPosY});
                            _setPosition(maxPosX,maxPosY);
                            break;
                    }
        },

        _inputChange = function(){
            var $this = $(this),
                max = $this.is(xpos) ? imgWrap.width() - wmarkWrap.width() : imgWrap.height() - wmarkWrap.height(),
                axis = $this.is(xpos) ? 'left' : 'top';

            if($this.val() > max){
                $this.val(max);
            } else if($this.val() < min){
                $this.val(min);
            }

            wmarkWrap.css(axis, $this.val() + 'px');
            clearGrid();
        },

        _arrowsChange = function(e){
            e.preventDefault();

            var $this = $(this),
                input = $this.siblings('input[type="text"]'),
                curVal = parseInt(input.val()) || 0,
                changeVal = $this.hasClass('m-top') ? curVal + 1 : curVal - 1,
                max = input.is(xpos) ? imgWrap.width() - wmarkWrap.width() : imgWrap.height() - wmarkWrap.height(),
                axis = input.is(xpos) ? 'left' : 'top';

            if(changeVal > max){
                changeVal = max
            } else if(changeVal < min){
                changeVal = min
            }

            input.val(changeVal);
            wmarkWrap.css(axis, changeVal + 'px');
            clearGrid();
        },

        _setPosition = function(x,y){
            xpos.val(Math.round(x));
            ypos.val(Math.round(y));
        },

        clearGrid = function(){
            var gridItems = $('.b-grid-list li');
            if(gridItems.hasClass('m-active')){
                gridItems.removeClass('m-active');
            }
        },

        resetPosition = function(){
            _setPosition(0,0);
            wmarkWrap.css({
                'left': 0,
                'top': 0
            });
            clearGrid();
        };

	return {
		init: init,
        reset: resetPosition,
        clearGrid: clearGrid
	};

})();