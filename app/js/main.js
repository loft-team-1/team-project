var dragDrop = (function(){

        var init = function(){
                _setUpListeners;
            },

            _setUpListeners = function(){
                //listeners
            },

            _appendDraggableEl = function(obj){
                var xpos = $('.b-controls input[name="xpos"]'),
                    ypos = $('.b-controls input[name="ypos"]'),
                    image = $('.b-main-area');

                obj.appendTo(image).draggable({
                    containment: image,
                    cursor: "move",
                    drag: function( event, ui ) {
                        xpos.val(ui.position.left);
                        ypos.val(ui.position.top);
                    }
                });
            };

        return {
            init: init,
            appendEl: _appendDraggableEl
        };
})();

var wmarkOpacity = (function(){

    var init = function(){
        var sliderEl = $('.b-opacity-slider'),
            wtmark = $('.b-main-area .drag');
            if (sliderEl.length) { 
                 sliderEl.slider({
                      min: 1,
                      max: 100,
                      value: 100,
                      range: "min",
                      slide: function(event, ui) {
                          wtmark.css('opacity', ui.value / 100);
                      } 
                 });
            }
        };
    return {
            init: init
            };
})();

var wmarkAlign = (function(){
    var
      //обертка картинки
      imgWrap = $('.b-main-area'),
      //ее ширина и высота
      imgWrapHeight = imgWrap.height(),
      imgWrapWidth = imgWrap.width(),

      //размеры ватермарка
      wtmarkHeight = 0,
      wtmarkWidth = 0;



  var init = function () {
    var wtmark = $('.b-main-area .drag');

    //если ватермарк есть то вычисляем его размеры
    if (wtmark.length) {
          wtmarkHeight = wtmark.outerHeight();
          wtmarkWidth = wtmark.outerWidth();
    };

    var midPosX = (imgWrapWidth - wtmarkWidth) / 2;
    var midPosY = (imgWrapHeight - wtmarkHeight) / 2;
    $('.b-grid-list li').each(function(i,el){
      $(el).on('click', function(){
          var li = $(this),
              posit = li.data('pos');
          li.siblings('.m-active').removeClass('m-active');
          li.addClass('m-active');
          wtmark.css('position','absolute'); 
          switch (posit) {
            case 'top-left':
              wtmark.css({'left':'0','top':'0','right':'auto','bottom':'auto'});
              break;
            case 'top-center':
              wtmark.css({'left':midPosX,'top':'0','right':'auto','bottom':'auto'});
              break;
            case 'top-right':
              wtmark.css({'left':'auto','top':'0','right':'0','bottom':'auto'});
              break;
            case 'mid-left':
              wtmark.css({'left':'0','top':midPosY,'right':'auto','bottom':'auto'});
              break;
            case 'mid-center':
              wtmark.css({'left':midPosX,'top':midPosY,'right':'auto','bottom':'auto'});
              break;
            case 'mid-right':
              wtmark.css({'left':'auto','top':midPosY,'right':'0','bottom':'auto'});
              break;
            case 'btm-left':
              wtmark.css({'left':'0','top':'auto','right':'auto','bottom':'0'});
              break;
            case 'btm-center':
              wtmark.css({'left':midPosX,'top':'auto','right':'auto','bottom':'0'});
              break;
            case 'btm-right':
              wtmark.css({'left':'auto','top':'auto','right':'0','bottom':'0'});
              break;
          };
      })
    });
  };

  return {
            init: init
            };
})();

$(document).ready(function(){
    dragDrop.init();
    dragDrop.appendEl($('<div style="width: 50px; height: 50px; border: 3px solid red;" class="drag">Drag me </div>'));
    wmarkOpacity.init();
    wmarkAlign.init();
});