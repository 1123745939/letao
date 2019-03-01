$(function () {
    var productId = getSearch("productId")

    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data:{
            id: productId
        },
        dataType: "json",
        success: function (info) {
            console.log(info)
            var htmlStr = template("productDetailTpl", info)
            $(".mui-scroll").html( htmlStr )

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
            interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            
            mui(".mui-numbox").numbox()

        }
    })
})