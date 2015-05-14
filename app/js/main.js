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

$(document).ready(function(){
    dragDrop.init();
    dragDrop.appendEl($('<div style="width: 50px; height: 50px; border: 3px solid red;" class="drag">Drag me </div>'));
});