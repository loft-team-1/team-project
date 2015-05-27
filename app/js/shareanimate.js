	$('.b-share-icon').on('click', function(){
		var e = $('.b-share');
		if (e.hasClass('m-opened')) {
			$('.b-share-icon').animate(
				{
					'right':'0px'
				},
				{
					duration: 200
				}
			);
			$('.b-share-socials-list').animate(
				{
					'left':'-43px'
				}, 
				{
					duration: 200,
					complete: function(){
						e.removeClass('m-opened');
					}
				}
			);

		} else {
			$('.b-share-icon').animate(
				{
					'right':'-43px'
				},
				{
					duration: 200
				}
			);
			$('.b-share-socials-list').animate(
				{
					'left':'0px'
				},
				{
					duration: 200,
					complete: function(){
						e.addClass('m-opened');
					}
				}
			);
		}
	});

	$(document).click(function(event) { 
	    if(!$(event.target).closest('.b-share-socials-list').length) {
	        var e = $('.b-share');
			if (e.hasClass('m-opened')) {
				$('.b-share-icon').animate(
					{
						'right':'0px'
					},
					{
						duration: 200
					}
				);
				$('.b-share-socials-list').animate(
					{
						'left':'-43px'
					},
					{
						duration: 200,
						complete: function(){
							e.removeClass('m-opened');
						}
					}
				);
			}  
		}      
	});