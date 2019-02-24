$(function () {
    var currentPage = 1;
    var pagesize = 5;
    var currentId = "";
    var isDelete = "";

    // 1 获取用户列表
    render()
    function render() {
        $.ajax({
            tyep: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pagesize
            },
            dataType: "json",
            success: function (info) {
                var htmlStr = template( 'tpl', info )
                $('tbody').html( htmlStr )
    
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    // 配置 bootstra 版本
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil( info.total / info.size ),
                    currentPages: info.page,
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page
                        render()
                    }
                })
            }
        });
    }
    // 2 点击禁用 显示模态框 通过事件委托绑定事件
    $("tbody").on("click", ".btn", function () {
        $("#userModal").modal("show")
        // 获取用户id jquery 提供获取自定义属性的方法 data()
        currentId = $(this).parent().data("id")
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    });

    // 3 点击确认按钮, 修改用户状态, 需要两个参数 (id ,isDelete)
    $('#submitBtn').click(function () {
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: "json",
            success: function (info) {
                if( info.success ){
                    $("#userModal").modal("hide")
                    render()
                }
            }
        })
    })
    
})