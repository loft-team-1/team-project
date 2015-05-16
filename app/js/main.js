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
        sliderEl = $('.b-opacity-slider');
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
            init: init,
            };
})();

$(document).ready(function(){
    dragDrop.init();
    dragDrop.appendEl($('<div id="watermark" style="width: 20px; border: 1px solid red;" class="drag">Drag me </div>'));
    wmarkOpacity.init();

    //fileupload basic https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
  $(function () {
      $('#fileupload').fileupload({
          dataType: 'json',
          done: function (e, data) {
              $.each(data.result.files, function (index, file) {
                  var upploadedImage = $('<div id=uploaded-image class=b-main-area__uploaded-image></div>');
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
                  $('#watermark').css('background', 'url(files/'+file.name+') no-repeat');
              });
          }
      });
  });

});


