$(function () {
    var currentPage = 1;
    var pageSize = 5;
    // 1 进入发送ajax 获取数据  通过模板引擎渲染
    render()
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                var htmlStr = template("secondTpl", info);
                $('tbody').html( htmlStr )
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil( info.total / info.size ),
                    currentPages: info.page,
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render()
                    }
                })
            }
        })
    }

    // 2 新增分类模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show")
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                // 使用模板渲染下拉框
                var htmlStr = template("dropTpl", info)
                $(".dropdown-menu").html( htmlStr )
            }
        })
    })

    // 3 使用事件代理 给下拉框绑定点击事件
    $(".dropdown-menu").click(function (e) {
        var categroyName = e.target.innerText;
        var categoryId = $(e.target).data("id")
        $("#categroy").text(categroyName)
        $("[name=categoryId]").val(categoryId)
    })

    // 4 图片上传 使用 fileupload 插件
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          $("#img-box").attr("src", data.result.picAddr)
          $("[name=brandLogo]").val(data.result.picAddr)
        }
    });

    // 5 表单验证
    $("#form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级列表"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    })
    // 6 阻止ajax默认提交
    $("#form").on('success.form.bv', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // Ajax 提交
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
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
                    $("categroy").text("请选择一级分类")
                    $("#img-box").remove()
                }
            }
        })
    })
})