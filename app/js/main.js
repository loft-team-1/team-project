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
            },
            _resetPosition = function(){
                var xpos = $('.b-controls input[name="xpos"]'),
                    ypos = $('.b-controls input[name="ypos"]'),
                    wtmark = $('#watermark');

                xpos.val(0);
                ypos.val(0);
                wtmark.css({
                    'left': 0,
                    'top': 0
                })
            };

        return {
            init: init,
            appendEl: _appendDraggableEl,
            reset: _resetPosition
        };
})();

var wmarkOpacity = (function(){

    var init = function(){
        var sliderEl = $('.b-opacity-slider');
        var wtmark = $('.b-main-area .drag');
        var wtmarkImg = $('.b-main-area .drag img');
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
        },
        _resetOpacity = function(){
            var sliderEl = $('.b-opacity-slider');
            var wtmark = $('.b-main-area .drag');
                sliderEl.slider("value", 100);
                wtmark.css('opacity', 100);

        };

    return {
            init: init,
            reset: _resetOpacity
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
    dragDrop.appendEl($('<div id="watermark" style="position:absolute;left:0;top:0;" class="drag"></div>'));
    wmarkOpacity.init();
    wmarkAlign.init();
});


    $('.m-btns :reset').on('click', function(){
        dragDrop.reset();
        wmarkOpacity.reset();
    });

    //fileupload basic https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
  $(function () {
      $('#fileupload').fileupload({
          dataType: 'json',
          done: function (e, data) {
              $.each(data.result.files, function (index, file) {
                  var upploadedImage = $('<div id="uploaded-image" class="b-main-area__uploaded-image"></div>');
                  $('#workspace').prepend(upploadedImage);
                  $(upploadedImage).css('background-image', 'url(files/' + file.name + ')');
              });
          }
      });
  });
  $(function () {
      $('#wmarkfile').fileupload({
          dataType: 'json',
          done: function (e, data) {
              $.each(data.result.files, function (index, file) {
                  $('#watermark').html('<img src="files/'+file.name+'">');
                  var wtmark = $('.b-main-area .drag');
                  var wtmarkImg = $('.b-main-area .drag img');
                  wtmark.width(wtmarkImg.width());
                  wtmark.height(wtmarkImg.height());
              });
          }
      });
  });

