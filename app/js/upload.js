var upload = (function(){

    var init = function(){
        $('input[type="file"]').fileupload(
            {
                url: '//jquery-file-upload.appspot.com/',
                dataType: 'json',
                // Enable image resizing, except for Android and Opera,
                // which actually support image resizing, but fail to
                // send Blob objects via XHR requests:
                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator && navigator.userAgent),
                imageMaxWidth: 800,
                imageMaxHeight: 800,
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
                    }

                }
            });
    };

    return {
        init: init
    }
})();
