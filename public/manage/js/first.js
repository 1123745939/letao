$(function () {
    var currentPage = 1;
    var pageSize = 5;

    // 1 获取一级分类列表
    render()
    function render() {
        $.ajax({
            tyep: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
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

    // 2 添加一级分类
    $("#addBtn").click(function () {
        $("#addModal").modal("show")
    })

    // 3 添加表单校验
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    })

    // 4 阻止ajax默认提交
    $("#form").on('success.form.bv', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // Ajax 提交
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $("#form").serialize(),
            dataType: "json",
            success: function ( info ) {
                console.log(info)
                if( info.success ) {
                    // 登录成功,关闭模态框,重新加载数据
                    $("#addModal").modal("hide")
                    currentPage = 1;
                    render()
                    // 重置表单
                    $("#form").data("bootstrapValidator").resetForm(true)
                }
            }
        })
    })
})