$(function() {
    /**
     * 1 表单验证 校验规则：
        1. 用户名不能为空
        2. 用户密码不能为空
        3. 用户密码长度为6-12位
     */
    $("#form").bootstrapValidator({
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
                    }
                }
            }
        }
    })
})