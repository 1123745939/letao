$(function () {
    // 1 登录拦截
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        dataType: "json",
        success: function (info) {
            console.log(info)         
            if(info.error === 400) {
                location.href = "login.html"
            }   
            var htmlStr = template("userTpl", info)
            $(".lt-main").html( htmlStr )
        }
    })
    // 2 退出登录
    $(".lt-main").on("click", ".logoutBtn", function (e) {
        $.ajax({
            type: "get",
            url: "/user/logout",
            dataType: "json",
            success: function(info) {
                if(info.success){
                    location.href = "login.html"
                }
            }
        })
    })
})