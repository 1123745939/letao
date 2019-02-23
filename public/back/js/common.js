
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