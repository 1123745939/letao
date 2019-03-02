$(function () {
    // 1 一进入 渲染界面
    function render() {
        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "/cart/queryCart",
                dataType: "json",
                success: function (info) {
                    console.log(info)
                    if(info.error === 400){
                        location.href = "login.html"
                    }
                    var htmlStr = template("cartTpl", { arr: info })
                    $("#cart-list").html( htmlStr )
    
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
                }
            }) 
        },500)
           
    }
    
    // 2 删除事件
    $(".lt-main").on("tap", "a.btn_delete", function () {
        var id = $(this).data("id")
        $.ajax({
            type: "get",
            url: "/cart/deleteCart",
            data: {
                id: [ id ]
            },
            dataType: "json",
            success: function (info) {
                mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
            }
        })
    })

    // 3 下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,
                callback :function (params) {
                    render()
                }
            }
        }
      });

    // 4 编辑功能
    $(".lt-main").on("tap", "a.btn_edit", function () {
        var obj = this.dataset
        
        var htmlStr = template("editTpl", obj)
        htmlStr = htmlStr.replace(/\n/g, "")
        mui.confirm(htmlStr, "编辑商品", ["确认","取消"], function (e) {
            if(!e.index){
                var size = $(".lt-item-size span.current").text()
                var num = $(".mui-numbox-input").val()
                $.ajax({
                    type: "post",
                    url: "/cart/updateCart",
                    data: {
                        id: obj.id,
                        size: size,
                        num: num
                    },
                    dataType: "json",
                    success: function (info) {
                        if(info.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
                        }
                    }
                })    
            }
        })
        // 数字框初始化
        mui(".mui-numbox").numbox()
    })

    //5 修改模态框点击选择尺码事件
    $("body").on("click", ".lt-item-size span", function () {
        $(this).addClass("current").siblings().removeClass("current")
    })
    
})