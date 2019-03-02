$(function () {
    // 1 进入界面即渲染一级分类
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        dataType: "json",
        success: function (info) {
            var htmlStr = template("leftTpl", info)
            $(".lt-catagroy-left ul").html( htmlStr )
            
            // 渲染二级分类
            var secondId = info.rows[0].id
            renderSecondById(secondId)
        }
    })

    // 2 实现一个方法  根据一级分类 渲染二级分类
    function renderSecondById( id ) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: { id: id },
            dataType: "json",
            success: function (info) {
                var htmlStr = template("rightTpl", info)
                $(".lt-catagroy-right ul").html( htmlStr )
            }
        })
    }

    // 3 一级分类点击事件
    $(".lt-catagroy-left ul").on("click", "a", function (e) {
        $(this).addClass("current").parent().siblings().find("a").removeClass("current")
        var secondId = $(this).data("id")
        renderSecondById(secondId)
    })
})