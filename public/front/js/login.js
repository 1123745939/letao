$(function () {
    // 1 登录功能
    $("#loginBtn").click(function () {
        var username = $("#username").val()
        var password = $("#password").val()
        if(username === ""){
            mui.toast("请输入用户吗")
            return
        }
        if(password === ""){
            mui.toast("请输入密码")
            return
        }
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            success: function (info) {
                if(info.error === 403){
                    mui.toast("用户名或密码错误")
                }
                if(info.success){
                    if(location.search.indexOf("returnUrl")>0){
                        var search = location.search.replace("?returnUrl=","")
                        location.href = search
                    }else{
                        location.href = "user.html"
                    }
                }
            }
        })
    })
})