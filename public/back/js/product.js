$(function () {
    var currentPage = 1;
    var pageSize = 5;

    // 1 加载列表数据
    render()

    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);

                // 模板引擎渲染列表
                var htmlStr = template("productTpl", info)
                $('tbody').html( htmlStr )
                // 分页条初始化
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
        // 加载二级分类下拉框数据
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                var htmlStr = template( "dropTpl", info)
                $(".dropdown-menu").html( htmlStr )
            }
        })
    })

    // 3 事件委托 绑定点击下拉列表事件
    $(".dropdown").click(function (e) {
        var brandName = $(e.target).text()
        var brandId = $(e.target).data("id")
        $("#brand").text( brandName )
        $("[name=brandId]").val( brandId )
    })

    // 4 图片上传 使用 fileupload 插件
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
        }
    });

    // 5 表单校验
    $("#form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品价格"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }
    });

    // 6 阻止ajax默认提交
    $('#form').on("success.form.bv", function( e ) {
        // 阻止默认的提交
        e.preventDefault();
        // Ajax 提交
        // $.ajax({
        //     type: "post",
        //     url: "/product/addProduct",
        //     data: $("#form").serialize(),
        //     dataType: "json",
        //     success: function ( info ) {
        //         console.log(info)
        //         if( info.success ) {
        //             // 登录成功,关闭模态框,重新加载数据
        //             $("#addModal").modal("hide")
        //             currentPage = 1;
        //             render()
        //             // 重置表单
        //             $("#form").data("bootstrapValidator").resetForm(true)
        //         }
        //     }
        // })
    })
})