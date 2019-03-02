
// ajax 全局事件 
// ajaxComplete 完成事件 请求完成调用 不管成功还是失败
// ajaxError 失败时调用
// ajaxSuccess 成功调用
// ajaxSend 请求前调用
// ajaxStart 请求时调用
// ajaxStop 请求都完成时调用

/**
 * 调用ajax时的进度条功能
 */
$(document).ajaxStart(function () {
    // 开启进度条
    NProgress.start()
})
$(document).ajaxStop(function () {
    // 关闭进度条
    NProgress.done()
})

// 登录拦截
if(location.href.indexOf("login.html")<0){
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        dataType: "json",
        success: function (info) {
            if(info.error === 400){
                location.href = "login.html"
            }
        }
    })
}

$(function () {
    // 1 分类管理切换功能
    $(".categroy").click(function () {
        // 切换 child 显示隐藏
        $(".nav .child").stop().slideToggle()
    })

    // 2 侧边栏切换功能
    $(".icon-menu").click(function () {
        $(".aside").toggleClass("hidemenu")
        $(".main").toggleClass("hidemenu")
        $(".topbar").toggleClass("hidemenu")
    })

    // 3 点击对出按钮，弹出模态框
    $(".icon-logout").click(function () {
        $("#logoutModal").modal('show')
    })

    // 4 退出功能
    $("#logout-btn").click(function () {
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dateType: "json",
            success: function (info) {
                if(info.success){
                    location.href = "login.html"
                }
            }
        })
    })
})