$(function() {
    //点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
            // 禁止默认的提交行为
            e.preventDefault();
            //发起Ajax的提交请求
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            $.post('/api/reguser', data,
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功，请登录！')
                        // 模拟认的点击行为
                    $('#link_login').click();
                })

        })
        // 监听登录表单的提交事件

    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')

                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })


    // $("#form_login").on('submit', function(e) {
    //     e.preventDefault()
    //     $.ajax({
    //         url: 'http://ajax.frontend.itheima.net/api/login',
    //         method: 'POST',
    //         // 快速获取表单中的数据
    //         data: $(this).serialize(),
    //         success: function(res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('登录失败！')
    //             }
    //             layer.msg('登录成功！')
    //             console.log(res.token)
    //                 // 跳转到后台主页
    //                 // location.href = '/index.html'
    //         }
    //     })
    // })

})