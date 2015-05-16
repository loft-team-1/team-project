var upload = (function(){

    var init = function(){
        $('input[type="file"]').fileupload(
            {
                dataType: 'json',
                done: function (e, data) {
                    var type = $(this).is("#fileupload") ? 'image' : 'watermark',
                        imageName = data.result.files[0].name,
                        src = "php/files/" + imageName,
                        image = $('<img id="'+ type +'" src="' + src + '" class="b-main-area-' + type + '">');

                    if(type == 'image'){
                        $('#workspace').append(image);
                    }
                    else{
                        dragDrop.appendEl(src);
                        wmarkOpacity.init();
                        wmarkAlign.init();
                    }

                }
            });
    };

    return {
        init: init
    }
})();