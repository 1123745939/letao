$(function () {
    var URL = window.URL || window.webkitURL;
    var $image = $("#img")
    //获取图片截取的位置
    var $dataX = $('#dataX');
    var $dataY = $('#dataY');
    var $dataHeight = $('#dataHeight');
    var $dataWidth = $('#dataWidth');
    var $dataRotate = $('#dataRotate');
    var $dataScaleX = $('#dataScaleX');
    var $dataScaleY = $('#dataScaleY');


    var options = {
        aspectRatio: 1 / 1, //裁剪框比例1:1
        preview: '.img-preview',
        crop: function (e) {
            $dataX.val(Math.round(e.detail.x));
            $dataY.val(Math.round(e.detail.y));
            $dataHeight.val(Math.round(e.detail.height));
            $dataWidth.val(Math.round(e.detail.width));
            $dataRotate.val(e.detail.rotate);
            $dataScaleX.val(e.detail.scaleX);
            $dataScaleY.val(e.detail.scaleY);
        }
        };

    $image.cropper(options)

    var cropper = $image.data('cropper');
        
    $(".button-wrapper").on("click", "[data-method]", function (e) {
        var $this = $(this);
        var method = $this.data("method");
        var $target = $(e.target);
        switch (method) {
            case "zoom+":
                $image.cropper("zoom", 0.1);
                break;
            case "zoom-":
                $image.cropper("zoom", -0.1);
                break;
            case "rotate+90":
                $image.cropper("rotate", -90);
                break;
            case "rotate-90":
                $image.cropper("rotate", 90);
                break;
            case "refresh":
                $image.cropper("reset");
                break;
            case "uploadImage":
                
                break;
            case "uploadAva":
                var result = $image.cropper("getCroppedCanvas",{ MaxWidth:4096, MaxHeight:4096 });
                var base64 = result.toDataURL('image/jpeg')
                
                if( base64.length > 99999 ) {
                    alert("头像太大,请重新调整")
                    return
                }
                console.log(base64)
                break;
        }
    })


    var blobURL;
    var $inputImage = $('#inputImage');
    if (URL) {
        
        $(".file-wrapper").on("change","#inputImage", function () {
            var files = this.files;
            var file;
            if (cropper && files && files.length) {
                file = files[0];
        
                if (/^image\/\w+/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    cropper.reset().replace(blobURL);
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        })
        $inputImage.onchange = function () {
            var files = this.files;
            var file;
            if (cropper && files && files.length) {
                file = files[0];
        
                if (/^image\/\w+/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    cropper.reset().replace(blobURL);
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
})