$(function () {

    render()
    // 1 封装渲染方法
    function render() {
        var arr = getHistory()
        var htmlStr = template("historyTpl", { arr: arr })
        $(".search-history").html( htmlStr )
    }

    // 2 查询事件
    function search(params) {
        var historyVal = $("#searchInput").val().trim()
        if(historyVal !== ""){
            location.href = "searchList.html?key=" + historyVal
            setHistory( historyVal )
            $("#searchInput").val("")
        } else {
            mui.toast('请输入搜索关键字',{ duration:'short', type:'div' }) 
        }
    }
    // 点击查询按钮
    $("#searchBtn").click(function () {
        search()
    })
    // enter键按下事件
    $(document).keydown(function (e) {
        if(e.keyCode === 13) {
            search()
        }
    })

    // 3 删除单个历史记录事件
    $(".search-history").on("click", ".btn-delete", function () {
        var $this = this
        mui.confirm("您确认要删除本条记录吗?", "温馨提示", ["取消","确认"], function (e) {
            if(e.index === 1){
                var index= $($this).data("index")
                var arr = getHistory()
                arr.splice(index, 1)
                var history = JSON.stringify(arr)
                localStorage.setItem("search_list",history) 
                render()
            } 
        })
        
    })

    // 6 清空全部历史记录
    $("#clearAll").click(function () {
        mui.confirm("您确认要删除全部记录吗?", "温馨提示", ["取消","确认"], function (e) {
            if(e.index === 1){
                localStorage.removeItem("search_list") 
                render()
            }
        })
    })
})