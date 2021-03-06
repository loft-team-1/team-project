var share = (function(){

	// set variables
	var speed = 'fast',
		share = $('.b-share'),
		shareIcon = $('.b-share-icon'),
		shareList = $('.b-share-socials-list'),
		shareLink = $('.b-share-socials-link');

	var init = function(){
		_setupListeners();
	},

	// set listeners
	_setupListeners = function(){
		shareIcon.on('click touchstart', _shareToggle);
		$(document).on('click touchstart', _shareHide);
		shareLink.on('click touchstart', _share);
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
	},

	_share = function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue;

		var $this = $(this),
			location = document.location.href,
			title = document.title,
			desc = $('meta[name="description"]').attr('content');

		if($this.hasClass('vk-ico')){
			url  = 'http://vk.com/share.php?';
			url += 'url='          + encodeURIComponent(location);
			url += '&title='       + encodeURIComponent(title);
			url += '&description=' + encodeURIComponent(desc);
			url += '&noparse=true';
		} else if($this.hasClass('fb-ico')){
			url  = 'http://www.facebook.com/sharer.php?s=100';
			url += '&p[title]='    + encodeURIComponent(title);
			url += '&p[url]='      + encodeURIComponent(location);
		} else if($this.hasClass('tw-ico')){
			url  = 'http://twitter.com/share?';
			url += 'text='         + encodeURIComponent(title);
			url += '&url='         + encodeURIComponent(location);
			url += '&counturl='    + encodeURIComponent(location);
		}

		var popup = function(url) {
			window.open(url,'','toolbar=0,status=0,width=626,height=436');
		};

		popup(url);
	};

	return {
		init: init
	};

})();