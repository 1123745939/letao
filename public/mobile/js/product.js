$(function () {
    var productId = getSearch("productId")
    // 1 一进入界面  模板渲染
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: productId
        },
        dataType: "json",
        success: function (info) {
            console.log(info)
            var htmlStr = template("productDetailTpl", info)
            $(".mui-scroll").html(htmlStr)

            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            mui(".mui-numbox").numbox()
        }
    })

    // 2 事件委托 点击尺码事件
    $(".lt-main").on("click", ".lt-item-size span", function () {
        $(this).addClass("current").siblings().removeClass("current")
    })

    // 3 加入购物车
    $("#addCart").click(function () {
        var size = $(".lt-item-size span.current").text()
        var num = $(".mui-numbox-input").val()
        if (!size) {
            mui.toast("请选择尺码")
            return
        }
        if (num <= 0) {
            mui.toast("请选择数量")
            return
        }
        // 发送ajax
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: productId,
                num: num,
                size: size
            },
            dataType: "json",
            success: function (info) {
                // 验证登录
                if (info.error === 400) {
                    // 跳转登录页  登录完成跳转商品详情
                    location.href = "login.html?returnUrl=" + location.href
                }
                if (info.success) {
                    mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
                        if (e.index === 0) {
                            location.href = "cart.html"
                        }
                    })
                }
            }
        })
    })
})