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

$(document).ready(function(){
    dragDrop.init();
    dragDrop.appendEl($('<div id="watermark" style="width: 200px; height: 200px; border: 1px solid red;" class="drag">Drag me </div>'));
    wmarkOpacity.init();

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

                  // $('#uploadedimage').attr('src', 'files/'+file.name);
                  // $('#workspace').css('background', 'url(php/files/'+file.name+') no-repeat');

                  var upploadedImage = $('<div id=uploaded-image class=b-main-area__uploaded-image></div>');
                  $('#workspace').prepend(upploadedImage);
                  $(upploadedImage).css('background-image', 'url(php/files/' + file.name + ')');

              });
          }
      });
  });
  $(function () {       
      $('#wmarkfile').fileupload({
          dataType: 'json',
          done: function (e, data) {
              $.each(data.result.files, function (index, file) {
                  $('#watermark').css('background', 'url(php/files/'+file.name+') no-repeat');
              });
          }
      });
    
    });

});


