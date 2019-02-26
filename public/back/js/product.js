$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];  // 图片存储
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
                    size: "normal",
                    // 配置按钮文本
                    // 参数type取值: page, first, last, prev, next
                    // 参数page: 当前按钮指向页码
                    // current: 当前页 
                    itemTexts: function (type, page, current) {
                        switch ( type ) {
                            case "page":
                                return page
                            case "first":
                                return "首页"
                            case "last":
                                return "尾页"
                            case "prev":
                                return "上一页"
                            case "next":
                                return "下一页"
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch ( type ) {
                            case "page":
                                return "前往第" + page + "页"
                            case "first":
                                return "前往首页"
                            case "last":
                                return "前往尾页"
                            case "prev":
                                return "前往上一页"
                            case "next":
                                return "前往下一页"
                        }
                    },
                    useBootstrapTooltip: true,
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
        $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
    })

    // 4 图片上传 使用 fileupload 插件 
    // 多文件上传  插件会遍历选中图片,发送多次请求去服务器,响应多次,每次响应触发 done 
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            // 在数组前面追加
            picArr.unshift(data.result)
            $("#img-wrapper").prepend('<img src="' + data.result.picAddr+ '" alt="" height="100px" id="img-box">')
            // 数组长度大于3 移除数组及图片结构最后一项 
            if(picArr.length > 3) {
                picArr.pop()
                // $("#img-wrapper img").eq(-1)
                // $("#img-wrapper img:last-of-type").remove()
                $("#img-wrapper img:last-of-type").remove()
            }
            // 图片数组长度为3 通过校验
            if(picArr.length === 3) {
                $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
            }
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
                    },
                    // 正则校验
                    // /d 表示数字 0-9
                    // + 表示出现一次或多次
                    // * 表示出现0次或多次
                    // ? 表示出现0次或1次
                    regexp: {
                      regexp: /^[1-9]\d*$/,
                      message: '商品库存必须是非0开头数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '商品尺码必须是xx-xx的形式'
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
            picStatus: {
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
        // 表单数据
        var paramsStr = $("#form").serialize()
        // 拼接图片地址
        paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr
        paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr
        paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr
        // Ajax 提交
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: paramsStr,
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
                    $("brandText").text("请选择二级分类")
                    $("#img-wrapper img").remove()
                }
            }
        })
    })
})