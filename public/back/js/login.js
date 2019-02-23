$(function() {
    /**
     * 1 表单验证 校验规则：
        1. 用户名不能为空
        2. 用户密码不能为空
        3. 用户密码长度为6-12位
     */
    $("#form").bootstrapValidator({
        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置字段
        fields: {
            username: {
               // 配置校验规则
               validators: {
                   // 非空
                   notEmpty: {
                       // 提示信息
                       message: "用户名不能为空！"
                   },
                   stringLength: {
                       min: 2,
                       max: 6,
                       message: "用户名长度必须在2到6位！"
                   },
                   // 回调规则
                   callback: {
                       message: "用户名不存在！"
                   }
               } 
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空！"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在6到12位！"
                    },
                    callback: {
                        message: "密码错误！"
                    }
                }
            }
        }
    })
    /**
     * 2 登录功能
     * 表单校验插件会在表单提交时校验
     * (1) 校验成功，默认提交表单，页面跳转
     *     在校验成功事件，阻止默认提交，使用Ajax进行发送请求
     * (2) 校验失败，不会提交表单
     */
    $("#form").on('success.form.bv', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // Ajax 提交
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("#form").serialize(),
            dataType: "json",
            success: function ( info ) {
                console.log(info)
                if( info.success ) {
                    // 登录成功，跳转首页
                    location.href = "index.html"
                }
                if( info.error ===1000 ){
                    //alert("用户不存在")
                    // updateStatus 更改校验状态
                    $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }
                if( info.error ===1001 ){
                    //alert("密码错误")
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }
            }
        })
    })
    /**
     * 3 重置Bug解决
     */
    $('[type="reset"]').click(function () {
        // 调用校验插件方法，重置校验状态
        // resetForm()
        // resetForm(true)时，重置内容及状态
        // resetForm(false)时，重置状态
        $("#form").data("bootstrapValidator").resetForm()
    })
})