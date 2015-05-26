$.fn.tooltip = function(options){

	// set options
	options = {
		position: options.position || 'left',
		content : options.content || 'I am tooltip'
	};

	// set variables
	var
		$this = $(this),
		$body = $('body'),
		elemWidth = $this.outerWidth(true),
		elemHeight = $this.outerHeight(true),
		topEdge = $this.offset().top,
		bottomEdge = topEdge + elemHeight,
		leftEdge = $this.offset().left,
		rightEdge = leftEdge + elemWidth;

	// tooltip markup
	var markup =
		'<div class="b-tooltip m-' + options.position + '" data-name="'+ ($this.attr('id') || $this.data('undefine') || '') +'"> \
			<div class="b-tooltip-inner">' + options.content + '</div> \
		</div>';

	// add element to body
	$body.append(markup);

	// set variables: tooltip, width, height, positions
	var
		createdTooltip = $body.find('.b-tooltip').last(),
		tooltipHeight = createdTooltip.outerHeight(true),
		tooltipWidth = createdTooltip.outerWidth(true),
		leftCentered = (elemWidth / 2) - (tooltipWidth / 2),
		topCentered = (elemHeight / 2) - (tooltipHeight / 2);

	var positions = {};

	// determines the position
	switch (options.position) {
		case 'right' :
			positions = {
				left: rightEdge,
				top: topEdge + topCentered
			};
			break;
		case 'top' :
			positions = {
				left: leftEdge + leftCentered,
				top: topEdge - tooltipHeight
			};
			break;
		case 'bottom' :
			positions = {
				left: leftEdge + leftCentered,
				top: bottomEdge
			};
			break;
		case 'left' :
			positions = {
				left: leftEdge - tooltipWidth,
				top: topEdge + topCentered
			};
			break;
	}

	// set tooltip
	createdTooltip
		.offset(positions)
		.css('opacity', '1');
};