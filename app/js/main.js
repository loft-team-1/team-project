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
    dragDrop.appendEl($('<div id="watermark" style="width: 200px; height: 200px; border: 3px solid red;" class="drag">Drag me </div>'));
    wmarkOpacity.init();

    //fileupload basic https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
  $(function () {
      $('#fileupload').fileupload({
          dataType: 'json',
          done: function (e, data) {
              $.each(data.result.files, function (index, file) {
                  $('<p/>').text(file.name).appendTo(document.body);
                  // $('#uploadedimage').attr('src', 'files/'+file.name);
                  $('#workspace').css('background', 'url(files/'+file.name+') no-repeat');
              });
          }
      });
  });
  $(function () {
      $('#wmarkfile').fileupload({
          dataType: 'json',
          done: function (e, data) {
              $.each(data.result.files, function (index, file) {
                  $('<p/>').text(file.name).appendTo(document.body);
                  $('#watermark').css('background', 'url(files/'+file.name+') no-repeat');
              });
          }
      });
  });

});


