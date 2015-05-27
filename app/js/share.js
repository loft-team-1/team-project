var share = (function(){

	// set variables
	var speed = 'fast',
		share = $('.b-share'),
		shareIcon = $('.b-share-icon'),
		shareList = $('.b-share-socials-list');

	var init = function(){
		_setupListeners();
	},

	// set listeners
	_setupListeners = function(){
		shareIcon.on('click touchstart', _shareToggle);
		$(document).on('click touchstart', _shareHide);
	},

	// share toggle
	_shareToggle = function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue;

		if (share.hasClass('m-opened')) {
			_shareHideAnimation();
		} else {
			_shareOpenAnimation();
		}
	},

	// share open
	_shareOpenAnimation = function(){
		shareIcon.animate({'right':'-43px'}, speed);
		shareList.animate({'left':'0'}, speed,
			function(){
				share.addClass('m-opened');
			}
		);
	},

	// share hide
	_shareHideAnimation = function(){
		shareIcon.animate({'right':'0'}, speed);
		shareList.animate({'left':'-43px'}, speed,
			function(){
				share.removeClass('m-opened');
			}
		);
	},

	// share hide by click on the document
	_shareHide = function(event){
		if(!$(event.target).closest(shareList).length) {
			if (share.hasClass('m-opened')) {
				_shareHideAnimation();
			}
		}
	};

	return {
		init: init
	};

})();